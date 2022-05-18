import { BigNumber } from "ethers";
import * as utils from "ethers/lib/utils";
import { expect, assert } from "chai";
import { ethers } from "hardhat";

const shouldGetValue = (): void => {

    context(`#getValue`, async function () {
      it(`get oracle`, async function () {

        const returnedValue = await this.apiConsumer
            .connect(this.signers.deployer)
            .getOracle();

        console.log("getOracle = ", returnedValue);        

      });

      it(`should request value for 1`, async function () {

        const returnedValue = await this.apiConsumer
            .connect(this.signers.deployer)
            .requestValue("", "");            //utils.formatBytes32String("requestId"), 1);

        console.log("requestValue = ", returnedValue);        

      });
      it(`should return value of 1`, async function () {

        const returnedValue = await this.apiConsumer
            .connect(this.signers.deployer)
            .getValue("");

        console.log("getValue = ", returnedValue);        

      });
    });
};

const shouldSetOracleJobFee = (): void => {

  context(`#setOracleJobFee`, async function () {
    it(`should set oracle job fee`, async function () {

      const returnedValue = await this.apiConsumer
          .connect(this.signers.deployer)
          .setOracleJobFee("0xD0691a51e3C6c562691D3C44C2944Bd9D368Ec1f", "", 12);

    });
  });
};

export { shouldGetValue, shouldSetOracleJobFee };
  