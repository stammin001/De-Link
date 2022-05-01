const { getNamedAccounts, deployments, network } = require("hardhat")

module.exports = async ({
    getNamedAccounts,
    deployments
  }) => {
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
  
    await deploy('APIConsumer_2', {
      from: deployer,
      args: [],
      log: true,
    });

  };
