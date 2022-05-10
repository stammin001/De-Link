import { Modal, Button } from "antd";

import React, { useMemo } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
// import { useNavigate } from "react-router-dom";
import Form from "../components/form";

export default function User_Data() {
    const { Moralis } = useMoralis();
    const contractProcessor = useWeb3ExecuteFunction();

    //using the deployed smart contract on rinkeby testnet for testing
    async function requestValue(val) {
        let options = {
            contractAddress: "0x92Ea2BD06Ec21b6517fD965769955c22271976eA",
            functionName: "requestValue",
            abi: [
                {
                    inputs: [
                        {
                            internalType: "string",
                            name: "_url",
                            type: "string",
                        },
                        {
                            internalType: "string",
                            name: "_path",
                            type: "string",
                        },
                    ],
                    name: "requestValue",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
            ],
            params: {
                _url: "https://test.com",
                _path: "test",
            },
            msgValue: Moralis.Units.ETH(0),
        };
        console.log("test");
        await contractProcessor.fetch({
            params: options,
            onSuccess: () => {
                let secondsToGo = 3;
                const modal = Modal.success({
                    title: "Success!",
                    content: `Thanks for submitting your information.`,
                });
                setTimeout(() => {
                    modal.destroy();
                }, secondsToGo * 1000);
            },
        });
    }

    return (
        <section>
            <h1>
                The first form entry is connected to contract
                0x356d2E7a0d592bAd95E86d19479c37cfdBb68Ab9 on rinkeby with
                function "requestValue"
            </h1>
            <Form scInteraction={requestValue} />
        </section>
    );
}
