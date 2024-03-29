import dotenv from "dotenv";
import {task} from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-deploy";

dotenv.config();

const PRIVATE_KEY_1 = process.env.PRIVATE_KEY_1;
const PRIVATE_KEY_2 = process.env.PRIVATE_KEY_2;
const KOVAN_URL = process.env.KOVAN_URL;
const RINKEBY_URL = process.env.RINKEBY_URL;
const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY;

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
//  defaultNetwork: "ganache",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: "remote",
    },
    kovan: {
      url: KOVAN_URL,
      accounts: PRIVATE_KEY_1 !== undefined ? [PRIVATE_KEY_1, PRIVATE_KEY_2] : [],
      saveDeployments: true,
      chainId: 42,
    },
    rinkeby: {
      url: RINKEBY_URL,
      accounts: PRIVATE_KEY_1 !== undefined ? [PRIVATE_KEY_1, PRIVATE_KEY_2] : [],
      saveDeployments: true,
      chainId: 4,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.7",
      },
      {
        version: "0.7.0",
      },
      {
        version: "0.6.6",
      },
      {
        version: "0.5.0",
      },
      {
        version: "0.4.11",
      },
      {
        version: "0.4.24",
      },
    ],
  },
  namedAccounts: {
    deployer: 0,
  },
  paths: {
    sources: "contracts",
  },
  etherscan: {
    apiKey: ETHERSCAN_KEY,
  },
};
