import { Fixture } from "ethereum-waffle";
import { ContractFactory, Wallet } from "ethers";
import { ethers } from "hardhat";
import { APIClient, APIConsumer, LinkToken, MockOracle } from "../../typechain"
import { deployMockAPIConsumer } from "./mocks";

type APIClientFixtureType = {
  apiClient: APIClient;
};

type APIConsumerFixtureType = {
  apiConsumer: APIConsumer;
  linkToken: LinkToken;
  mockOracle: MockOracle;
};

const apiClientFixture: Fixture<APIClientFixtureType> = async (
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

const apiConsumerFixture: Fixture<APIConsumerFixtureType> = async (
  signers: Wallet[]
) => {

  console.log("Building APIConsumer Fixture...");
  const deployer: Wallet = signers[0];

  const apiConsumerFactory: ContractFactory = await ethers.getContractFactory(`APIConsumer`);
  const linkTokenFactory: ContractFactory = await ethers.getContractFactory(`LinkToken`);
  const mockOracleFactory: ContractFactory = await ethers.getContractFactory(`MockOracle`);

  const linkToken: LinkToken = (await linkTokenFactory
    .connect(deployer)
    .deploy()) as LinkToken;
  
  await linkToken.deployed();
  console.log("Deployed Link Token...", linkToken.address);

  const mockOracle: MockOracle = (await mockOracleFactory
    .connect(deployer)
    .deploy(linkToken.address)) as MockOracle;
  
  await mockOracle.deployed();
  console.log("Deployed Mock Oracle...", mockOracle.address);

  const apiConsumer: APIConsumer = (await apiConsumerFactory
    .connect(deployer)
    .deploy(mockOracle.address, linkToken.address)) as APIConsumer;

  await apiConsumer.deployed();
  
  return { apiConsumer, linkToken, mockOracle };
};

export { apiClientFixture, apiConsumerFixture };