import { Fixture, MockContract } from "ethereum-waffle";
import { Wallet } from "@ethersproject/wallet";
import { APIClient } from "../../typechain";

declare module "mocha" {
  export interface Context {
    loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
    signers: Signers;
    mocks: Mocks;
    apiClient: APIClient;
  }
}

export interface Signers {
  deployer: Wallet;
  account2: Wallet;
}

export interface Mocks {
  mockAPIConsumer: MockContract;
}
