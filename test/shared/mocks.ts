import { MockContract } from "ethereum-waffle";
import { Signer } from "ethers";
import { waffle } from "hardhat";
import * as utils from "ethers/lib/utils";
import APIConsumer from "../../artifacts/contracts/APIConsumer.sol/APIConsumer.json";

export async function deployMockAPIConsumer(deployer: Signer): Promise<MockContract> {
    const apiConsumer: MockContract = await waffle.deployMockContract(
        deployer,
        APIConsumer.abi
    );

    await apiConsumer.mock.getValue.returns(1);
    await apiConsumer.mock.requestValue.returns(utils.formatBytes32String("requestId"));

    return apiConsumer;
}
