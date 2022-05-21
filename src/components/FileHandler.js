import { React } from "react";
import classes from "./form.module.css";
import { useMoralis } from "react-moralis";

export default function FileHandler() {

    const {Moralis, isAuthenticated} = useMoralis();

    async function uploadFile() {
        const data = document.getElementById("testfile").files[0];
        if(!isAuthenticated) {
            await Moralis.authenticate();
        }
        const file = new Moralis.File(data.name, data);
        await file.saveIPFS();

        console.log("Data =", data);
        console.log("File hash=", file.hash());
        console.log("File IPFS=", file.ipfs());

        const fileRef = new Moralis.Object("Applications");
        fileRef.set("name", data.name);
        fileRef.set("cert", file);
        await fileRef.save();
    };

    async function downloadFile() {
        const query = new Moralis.Query("Applications");
        query.equalTo("name", "puppy_1.jpg");
        query.find().then(function ([application]) {
            const ipfs = application.get("cert").ipfs();
            const hash = application.get("cert").hash();
            console.log("IPFS url", ipfs);
            console.log("IPFS hash", hash);
        });
    };

    return (
        <div className={classes.actions2}>
            <input type="file" id="testfile" name="testfile"/>

            <button onClick={uploadFile}>
                Upload
            </button>

            <button onClick={downloadFile}>
                Download
            </button>
        </div>
    );
}
