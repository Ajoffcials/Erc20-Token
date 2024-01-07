const { ethers, run, network } = require("hardhat");

module.exports = async function ({ deployments, getNamedAccounts }) {
  const chainId = network.config.chainId;
  const contractName = "Blockchain Oracle";
  const symbol = "BO";
  const intialSupport = 50;
  const deployer = (await getNamedAccounts()).deployer;
  const { deploy, log } = deployments;
  log(`deploying with address: ${deployer} pls wait...`);
  const args = [contractName, symbol, intialSupport];

  const ourToken = await deploy("OurToken", {
    from: deployer,
    log: true,
    args: args,
  });

  log(`contract deployed yah! address: ${ourToken.address}`);

  if (chainId != 31337 && process.env.ETHERSCAN_API_KEY) {
    try {
    } catch (error) {
      if (error.message.toLowercase().includes("already verifiled")) {
        log("Contract Already verifiled");
      }
      log(error);
    }
    log("verifying on etherscan pls wait ");
    await run("verify:verify", {
      address: ourToken.address,
      constructorArguments: args,
    });
  }
};
