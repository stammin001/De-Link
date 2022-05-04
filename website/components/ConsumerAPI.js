import { useWeb3Contract } from "react-moralis";
import abi from "../constants/abi.json";
// dont export from moralis when using react
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import { useNotification } from "web3uikit";
import { ethers } from "ethers";
import Form from "./form";

export default function CONSUMERAPI() {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis();
    // These get re-rendered every time due to our connect button!

    const contractAddress = "0x92Ea2BD06Ec21b6517fD965769955c22271976eA";
    // const dispatch = useNotification();

    const [url, setUrl] = useState("");
    const [path, setPath] = useState("");

    const { runContractFunction: requestValue } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "requestValue",
        msgValue: "",
        params: { _url: url, _path: path },
    });

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        });
    };

    const printer = (arg) => {
        console.log(path);
    };

    // Probably could add some error handling
    const handleSuccess = async (tx) => {
        await tx.wait(1);
        updateUIValues();
        handleNewNotification(tx);
    };

    return (
        <div className="p-5">
            <h1 className="py-4 px-4 font-bold text-3xl">
                CONSUMER API: requestValue()
            </h1>
            <Form setUrl={setUrl} setPath={setPath} />
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={async () =>
                    await requestValue({
                        // onComplete:
                        // onError:
                        onSuccess: handleSuccess,
                    })
                }
            >
                Request Value for Smart Contract
            </button>
        </div>
    );
}
