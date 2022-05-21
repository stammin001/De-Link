import { React } from "react";
import classes from "./form.module.css";
import { useMoralis } from "react-moralis";

export default function FileHandler() {

    const {Moralis, isAuthenticated} = useMoralis();
    var docName = "";

    function selectFile() {
        const inputFile = document.getElementById("inputfile");
        inputFile.click();
        inputFile.onchange = () => uploadFile();
    }

    async function uploadFile() {
        console.log("In uploadFile");
        updateStatus("Saving File on IPFS");
        const data = document.getElementById("inputfile").files[0];
        
        if(!isAuthenticated) {
            await Moralis.authenticate();
        }
        const file = new Moralis.File(data.name, data);
        await file.saveIPFS();

        console.log("Data =", data, " File has=", file.hash, " File IPFS=", file.ipfs);

        const fileRef = new Moralis.Object("Applications");
        docName = data.name;
        fileRef.set("name", data.name);
        fileRef.set("doc", file);
        await fileRef.save();
        updateStatus("");
    };

    async function viewFile() {
        const query = new Moralis.Query("Applications");
        query.equalTo("name", docName);
        query.find().then(function ([application]) {
            if(application != undefined) {
                const ipfs = application.get("doc").ipfs();
                const hash = application.get("doc").hash();
                console.log("IPFS url=", ipfs, " IPFS has=", hash);

                window.open(ipfs, "_blank");
            }
        });
    };

    function updateStatus(message) {
        document.getElementById("status").innerHTML = message;
    }

    return (
        <div>
            <div className={classes.actions2}>
                <input type="file" id="inputfile" hidden/>

                <button onClick={selectFile} id="uploadDoc">
                    Upload Document
                </button>

                <button onClick={viewFile}>
                    View Document
                </button>
            </div>
        </div>
    );
}
