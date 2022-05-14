import { waffle } from "hardhat";
import { apiClientFixture } from "../shared/fixtures";
import { Signers } from "../shared/types";
import { shouldGetCreds, shouldValidateCreds } from "./APIClient/APIClient.spec";

describe(`Unit Tests`, async () => {
  before(async function () {
    const wallets = waffle.provider.getWallets();

    this.signers = {} as Signers;
    this.signers.deployer = wallets[0];
    this.signers.account2 = wallets[1];

    this.loadFixture = waffle.createFixtureLoader(wallets);
  });

  describe(`APIClient`, async () => {
    beforeEach(async function () {
      const { apiClient } = await this.loadFixture(apiClientFixture);

      this.apiClient = apiClient;

    });

    shouldGetCreds();

    shouldValidateCreds();

  });
});
