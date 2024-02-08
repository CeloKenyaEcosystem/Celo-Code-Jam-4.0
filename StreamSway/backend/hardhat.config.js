require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({path:".env"});
const KEY = process.env.PRIVATE_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.2",
  networks:{
    alfajores:{
      url:"https://alfajores-forno.celo-testnet.org",
      accounts:[KEY],
    },
    celo: {
      url: "https://forno.celo.org",
      accounts: [KEY],
      },
      
    
  }
};
