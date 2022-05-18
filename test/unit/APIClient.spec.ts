import { BigNumber } from "ethers";
import * as utils from "ethers/lib/utils";
import { expect, assert } from "chai";
import { ethers } from "hardhat";

const shouldGetCreds = (): void => {

    context(`#getCreds`, async function () {
      it(`should return cred of 1`, async function () {

        const expectedCred: BigNumber = ethers.constants.One;

        const returnedCred = await this.apiClient
            .connect(this.signers.deployer)
            .getCreds("");
        
       assert(returnedCred.toBigInt() === expectedCred.toBigInt(), 'Returned Cred should be 1');
      });
    });
};

const shouldValidateCreds = (): void => {

    context(`#validateCreds`, async function () {
      it(`should return cred of 1 for validate`, async function () {

        const tx = await this.apiClient
            .connect(this.signers.deployer)
            .validateCreds("");

        const events = tx.wait(1).then(function(result) {
          console.log(result.events);
        });

      });
    });
};

export { shouldGetCreds, shouldValidateCreds };
  