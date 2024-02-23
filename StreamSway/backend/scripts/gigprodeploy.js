const { ethers } = require("hardhat");
//GigProContract deployed to: 0xd6fE72801EDdAaB9a5fcc012B66FE59211b5F0A7
//GigProContract deployed to: 0x17cAC4066211b5FCeEDCee67c7ae18950417f4c9
async function main() {
  console.log("Deploying....................\n");

  // Get the contract factory
  const GigPro = await ethers.deployContract("GigPro");

  ;
  await GigPro.waitForDeployment();

  console.log("GigProContract deployed to:",await GigPro.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });