import { React, useState } from "react";
import classes from "./form.module.css";
import { useMoralis } from "react-moralis";
import apiclient_abi from "../constants/apiclient_abi.json";

export default function FileHandler() {

    const {Moralis, isAuthenticated} = useMoralis();
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

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

        console.log("Data =", data, " File Hash =", file.hash(), " File IPFS =", file.ipfs());

        docName = data.name;

        const fileRef = new Moralis.Object("Applications");

        fileRef.set("name", data.name);
        fileRef.set("doc", file);
        await fileRef.save();

        uploadDoc(file.ipfs());
    };

    async function uploadDoc(link) {
        try {
            const tx = await Moralis.executeFunction({
                abi: apiclient_abi,
                contractAddress: contractAddress,
                functionName: "uploadDoc",
                params: { _input: link },   
            });
    
            console.log("TX = ", tx);
            await handleUploadDoc(tx);
            getDocs();    
        } catch(error) {
            handleError(error);
        }
    };

    async function resetDocs() {
        const account = Moralis.account;
        try {
            const tx = await Moralis.executeFunction({
                abi: apiclient_abi,
                contractAddress: contractAddress,
                functionName: "resetDocs",
                params: { _input: "0x0000000000000000000000000000000000000000"},
            });
    
            console.log("TX = ", tx);
            await handleUploadDoc(tx);
            getDocs();
        } catch(error) {
            handleError(error);
        }
    };

    async function getDocs() {
        try {
            const results = await Moralis.executeFunction({
                abi: apiclient_abi,
                contractAddress: contractAddress,
                functionName: "getDocs",
                params: { _input: Moralis.account },   
            });
    
            console.log("Result = ", results);

            var counter = 1;
            document.getElementById("docLinks").innerHTML = "";
            results.forEach(result => {
                document.getElementById("docLinks").innerHTML = document.getElementById("docLinks").innerHTML + 
                    `<div> <a href=${result} target="_blank"> Document ${counter++} </a> </div>`
                });
                            
        } catch(error) {
            handleError(error);
        }
    };

    async function handleError(tx) {
        console.log(tx);
        if(tx.code === 4001) {
            updateStatus("User denied transaction");
        } else {
            updateStatus(tx.message);
        }
        await new Promise(r => setTimeout(r, 2000));
        updateStatus("");    
    };

    async function handleUploadDoc(tx) {
        console.log("Transaction is in progress...", tx);
        updateStatus("Transaction is in progress...");
        if(tx !== undefined)
            await tx.wait(1);
        updateStatus("");
    };

    async function viewIPFSFile() {
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

                <button onClick={getDocs}>
                    View Documents
                </button>

                <button onClick={resetDocs}>
                    Reset Documents
                </button>

            </div>
            <br></br>
            <div id="docLinks" className={classes.actions2}>

            </div>
        </div>
    );
}
