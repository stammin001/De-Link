import { React, useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api, useWeb3Contract} from "react-moralis";
import event_abi from "../constants/event_abi.json";
import apiclient_abi from "../constants/apiclient_abi.json";
import FormData from "./FormData";
import classes from "./form.module.css";

export default function FormHandler() {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis();
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
    };

    async function handleValidateCreds(tx) {
        console.log("Transaction is being processed", tx);
        if(tx !== undefined)
            await tx.wait(1);
        console.log("handle success", tx);
    };

    async function handleGetCreds(data) {
        console.log("Returned Data: ", data, "Result Data: ", getResult(data));
        document.getElementById("result").innerHTML = getResult(data);
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

    const eventOptions = {
        chain: "rinkeby",
        address: eventsAddress,
        topic: "0x18bbbb84e3377ef5571d4752248b89a6c8fc102267139c9012e250a82da7520a",
        limit: "3",
        abi: event_abi,
    };

    async function handleEvents(requestId) {
        const events = await Web3Api.native.getContractEvents(eventOptions);
        console.log("Events = ", events);
        for(const event of events.result) {
            if(event.data.requestId === requestId) {
                document.getElementById("result").innerHTML = getResult(event.data.value);
            }
        }
    };

    return (
        <div className={classes.form}>
            <h2 className="">
                Education Credentials
            </h2>
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
                    await handleEvents("0xfb39f9dfd93fc24188233e11484a43f8b1f16096f01191f50510ab0d237a5455")
                }
            >
                Get Contract Events
            </button>
            </div>

        </div>
    );
}
