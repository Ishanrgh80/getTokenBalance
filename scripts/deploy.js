async function main() {

  const [deployer] = await ethers.getSigners();


  const tokenContract = await ethers.getContractFactory("TokenContract");

  // Start deployment, returning a promise that resolves to a contract object
  const tokens = await tokenContract.deploy();
  console.log("Contract deployed to address:", await tokens.getAddress());

  console.log("Deployers Address",await deployer.getAddress());
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });