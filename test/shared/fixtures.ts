import { Fixture } from "ethereum-waffle";
import { ContractFactory, Wallet } from "ethers";
import { ethers } from "hardhat";
import { APIClient } from "../../typechain"
import { deployMockAPIConsumer } from "./mocks";

type APIClientFixtureType = {
  apiClient: APIClient;
};

export const apiClientFixture: Fixture<APIClientFixtureType> = async (
  signers: Wallet[]
) => {
  const deployer: Wallet = signers[0];

  const apiClientFactory: ContractFactory = await ethers.getContractFactory(`APIClient`);

  const mockAPIConsumer = await deployMockAPIConsumer(deployer);

  const apiClient: APIClient = (await apiClientFactory
    .connect(deployer)
    .deploy(mockAPIConsumer.address)) as APIClient;

  await apiClient.deployed();
  
  return { apiClient };
};
