const { getNamedAccounts, deployments, network } = require("hardhat")

module.exports = async ({
    getNamedAccounts,
    deployments
  }) => {
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
  
    await deploy('APIConsumer', {
      from: deployer,
      args: [],
      log: true,
    });

    await deploy('APIClient', {
      from: deployer,
      args: [],
      log: true,
    });

  };
