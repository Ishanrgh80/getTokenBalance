require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks :{
    sepolia:{
      url : API_URL,
      accounts: [`${PRIVATE_KEY}`],
    },
  }


};
