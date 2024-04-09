const Web3 = require('web3');
const fs = require('fs');
require('dotenv').config();

// Create a Web3 instance
const rpc = process.env.API_URL;
const web3 = new Web3(rpc);

// Defining owner 
const owner = process.env.Owner;
const privateKey = process.env.PRIVATE_KEY;
// const OwnerAddress = web3.eth.accounts.privateKeyToAccount(owner);
// console.log('Owner Address' + JSON.stringify(OwnerAddress));

//contract Address 
const contractAdd = '0x0Cd905acFe294c6C6178F83D1C4A464Ae2f80237';

const jsonFile = './artifacts/contracts/erc20Token.sol/TokenContract.json';
const parsed = JSON.parse(fs.readFileSync(jsonFile));
const tokenABI = parsed.abi;


//const contract = new web3.eth.Contract(tokenABI,contractAdd);

//Token Address
const ethAddress = '0x583031D1113aD414F02576BD6afaBfb302140225';

// function for sending tokens to the tokenAddress or user
const transfer = async(_contractAdd,_toAddress,_amt) => {
    try{

        const contract = new web3.eth.Contract(tokenABI,_contractAdd);
        let txObj = contract.methods.transfer(_toAddress,_amt);
        const gas = await txObj.estimateGas({from:owner});
        const gasPrice = await web3.eth.getGasPrice();
        const data = txObj.encodeABI();
        

        const txn = {
            to: contractAdd,
            data,
            gas,
            gasPrice,
        };

        const sign = await web3.eth.accounts.signTransaction(txn, privateKey);
        const receipt = await web3.eth.sendSignedTransaction(sign.rawTransaction);
        console.log(receipt);

    }catch(err){
        console.log("Tokentrasnsfer error" + err);
    }
}

const amount = web3.utils.toWei('200','ether');

//transfer(contractAdd,ethAddress,amount);


// getting balance of the tokenAddress
const getTokenBalance = async (ethAddress,_contractAdd) =>{
    try{
    const contract = new web3.eth.Contract(tokenABI,_contractAdd);
    const balance = await contract.methods.balanceOf(ethAddress).call();
    //console.log(balance);

    return balance;

    }catch(err){
        console.error('Error retrieving token balance:', err);
        throw err;
    }
    }

getTokenBalance(ethAddress,contractAdd)
.then(balance => console.log('Token balance:', balance))
.catch(error => console.error('Error:', error));;
