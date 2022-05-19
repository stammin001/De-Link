import { React, useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api, useWeb3Contract, MoralisProvider } from "react-moralis";
import event_abi from "../constants/event_abi.json";
import apiclient_abi from "../constants/apiclient_abi.json";
import oracle_request_abi from "../constants/oracle_request_abi.json";
import FormData from "./FormData";
import classes from "./form.module.css";
import * as ethers from "ethers";
import * as utils from "ethers/lib/utils";

export default function FormHandler() {
    const { web3, Moralis, isWeb3Enabled, chainId } = useMoralis();
    const Web3Api = useMoralisWeb3Api();

    const contractAddress = "0xEc2833eDDe62f700CC88a933097D6094883238a8";
    const eventsAddress = "0xd724732DCC2A4D9BF1FB88C66ead347fd5aD95F1";

    const [id, setId] = useState("");
    const [university, setUniversity] = useState("");
    const [degree, setDegree] = useState("");
    const [input, setInput] = useState("");

    const { runContractFunction: validateCreds } = useWeb3Contract({
        abi: apiclient_abi,
        contractAddress: contractAddress,
        functionName: "validateCreds",
        msgValue: "",
        params: { _input: input },
    });

    const { runContractFunction: getCreds } = useWeb3Contract({
        abi: apiclient_abi,
        contractAddress: contractAddress,
        functionName: "getCreds",
        msgValue: "",
        params: { _input: input },
    });

    async function handleComplete(tx) {
        if(tx !== undefined) 
            console.log("Transaction Submitted", tx);
    };

    async function handleError(tx) {
        console.log(tx.message);
        updateStatus("User Denied Transaction");
    };

    async function handleValidateCreds(tx) {
        console.log("Transaction is being processed", tx);
        updateStatus("Transaction is in progress...");
        if(tx !== undefined)
            await tx.wait(1);
        console.log("handle success", tx);
        handleEvents(tx);
    };

    async function handleGetCreds(data) {
        console.log("Returned Data: ", data, "Result Data: ", getResult(data));
        document.getElementById("result").innerHTML = getResult(data);
        updateStatus("");
    };

    function getResult(data) {
        console.log("Parse Int ", parseInt(data));
        switch(parseInt(data)) {
            case 0:
                return "Not Available";
            case 1:
                return "Completed";
            case 2:
                return "Did not Complete";
            default:
                return "Not Available";
        }
    }

    function updateStatus(message) {
        document.getElementById("status").innerHTML = message;
    }

    const eventOptions = {
        chain: "rinkeby", 
        address: eventsAddress,
        topic: "0x18bbbb84e3377ef5571d4752248b89a6c8fc102267139c9012e250a82da7520a",
        limit: "30",
        abi: event_abi,
    };

    async function handleOracleEvent(requestId) {
        const events = await Web3Api.native.getContractEvents(eventOptions);
        console.log("Events = ", events);
        for(const event of events.result) {
            if(event.data.requestId === requestId) {
                document.getElementById("result").innerHTML = getResult(event.data.value);
            }
        }
        updateStatus("");
    };

    async function handleEvents(transaction) {
        const hash = transaction == undefined ? 
            "0x6d77f9d8c44b8651525b9cdb7c776bf9bb7eab2830e8565ec5713d39fb8ccd4b" : transaction.hash;
        const options = {
            chain: chainId, 
            transaction_hash: hash,
        };
        console.log("Waiting for 30 seconds");
        updateStatus("Waiting for Oracle response...");
        await new Promise(r => setTimeout(r, 30000));

        let tx = await Web3Api.native.getTransaction(options);
        console.log("Transaction = ", tx);

        const typesArray = oracle_request_abi.inputs.filter((input) => { return !input.indexed});
        const decoded = utils.defaultAbiCoder.decode(typesArray, tx.logs[3].data);
        console.log("Decoded Value = ", decoded);

        handleOracleEvent(decoded.requestId);
    };

    return (
        <div className={classes.form}>
            <div className={classes.row}>
                <div className={classes.column}>
                    <h3>Education Credentials</h3>
                </div>
                <div className={classes.column2}>
                    <h3 id="status"></h3>
                </div>
            </div>
        
            <FormData setInput={setInput} setId={setId} setUniversity={setUniversity} setDegree={setDegree} />
            <br></br>
            <div className={classes.actions2}>
            <button onClick={async () => {
                    await validateCreds({
                        onComplete: handleComplete,
                        onError: handleError,
                        onSuccess: handleValidateCreds,
                    })
                } }
            >
                Validate Credentials
            </button>
            </div>

            <div className={classes.actions2}>
            <button onClick={async () =>
                    await getCreds({
                        onComplete: handleComplete,
                        onError: handleError,
                        onSuccess: handleGetCreds,
                    })
                }
            >
                Get Credential Result
            </button>
            </div>
            
            <div className={classes.actions2}>
            <button
                onClick={async () =>
                    await handleEvents()
                }
            >
                Get Contract Events
            </button>
            </div>

        </div>
    );
}
