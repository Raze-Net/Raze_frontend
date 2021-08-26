# Raze

Raze protects payment anonymity and confidentiality on blockchains. It will consist of frontend (Javascript clients) and backend (Smart contracts written in Solidity) algorithms, which serve as an agency with proven security and privacy by making use of well-established cryptographic protocols.


# Raze Protocol 

Raze Protocol is a protocol that allows users to protect payment anonymity and confidentiality on the Ethereum network. It includes a set of backend contracts that maintain funds and actions on funds in encrypted forms, and a series of correspoding frontend user algorithms to interact with the contracts. Raze supports both ETH and any ERC20 token. On the high level, Raze can be viewed as an agency that workds on encrypted ETH and ERC20 tokens, and whose confidentiality and
anonymity are guaranteed by well-established cryptographic techniques. 


We briefly introduce the main functionalities below. 

## Register
#### [`ClientBase.register(secret)`](./lib/client_base.js#L431)
User inputs his or her private `secret` and the algorithm will generate a Raze public/private key pair. The Raze public key will be sent in a transaction to register an account in the contract.


## Mint 
#### [`ClientBase.mint(value)`](./src/client_base.js#L501)
Create a transaction to convert a specified amount of the user's plain tokens to an equivalent amount of encrypted Raze tokens.

## Redeem 
#### [`ClientBase.redeem(value)`](./src/client_base.js#L518)
Create a transaction to convert a specified amount of the user's encrypted Raze tokens back to an equivalent amount of plain tokens. Note that the transaction will include necessary cryptographic zero-knowledge proof to guarantee that this is a **valid** burn operation. 


## Transfer
#### [`ClientBase.transfer(receiver, value, decoys)`](./src/client_base.js#L617)
Create a transaction to transfer a specified amount of the user's encrypted Raze tokens from the current user to a receiver. Note that the transaction will include necessary cryptographic zero-knowledge proof to guarantee that this is a ***valid*** transfer operation.



# Environment Setup

1. Install node.js and npm (on MacOS)
```bash
brew install node 
```

2. Install Truffle
```bash
npm install -g truffle
truffle version
```

3. Install OpenZeppelin contracts. At the root of this project,
```bash
npm install @openzeppelin/contracts@3.3.0
```

4. Install `web3`, `bn.js`, `elliptic`. At the root of this project,
```bash
npm install web3
npm install bn.js
npm install elliptic
```

5. Install [Ganache](https://www.trufflesuite.com/ganache) for launching a test blockchain.


# Compile and Test

1. Compile the contract
```bash
truffle compile
```

2. Deploy the contract to the test blockchain of Ganache
```bash
truffle migrate --reset
```

3. Run the test (located at `./test/raze_eth.js`)
```bash
truffle test ./test/raze_eth.js
```

# Interact with the Client
To interact with the client, we need to first construct a client instance. We use `ClientRazeETH` in `./lib/client_razeeth` to show an example use case. In fact, this example is similar to the test in `./test/raze_eth.js`. The only difference is that, in the above test, Truffle provides a `contract` object, a `web3` object, and a list of `accounts`, but now we need to manually construct these. 

```js
const Web3 = require('web3');

/* 
    Construct a Web3 object. Here the URL 'https://ropsten.infura.io/v3/f0133270d95d492aa5d4bb8944b36bc6' is for the Ropsten Testnet, which is an official Ethereum test network. The last component 'f0133270d95d492aa5d4bb8944b36bc6' is my test project ID, which you can use.
*/
let web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/f0133270d95d492aa5d4bb8944b36bc6"));

/*
    Get the ABI of the RazeETH contract. This JSON file should have been generated when you run `truffle compile`. You just need to copy it to appropriate location so that `$.getJSON(***)` can find it.
*/
let razeETHabi = (await $.getJSON('RazeETH.json')).abi;

/*
    Construct a Web3 contract object. You should use the ABI and a blockchain address where you deploy the contract. Here the address '0x8DB0F612193D14A44c71bc58d3d89064a7545ebE' is where I deploy the RazeETH contract on the Ropsten Testnet. You can also use it, or use your own if you know how to deploy a contract on Ropsten.
*/
let razeETHContract = new web3.eth.Contract(razeETHabi, '0x8DB0F612193D14A44c71bc58d3d89064a7545ebE');

/*
    Get a list of accounts in the current web3 provider. For this to work, you need to install the MetaMask browser plugin and create an account there.
*/
let accounts = await web3.eth.getAccounts();

/*
    Finally, construct the client.
*/
let alice = new ClientRazeETH(web3, razeETHContract, accounts[0]);

await alice.init();
await alice.register();
await alice.mint(10);
await alice.redeem(5);
await alice.transfer(bob_address, 5); 
/*
    Here 'bob_address' is the Raze public key of bob. Assuming bob is similarly constructed like alice, then 
    bob_address = bob.account.publicKeyEncoded();
*/
```


# Local Installation of Suterusu Client
Git clone the repository:
```bash
git clone https://github.com/zjk89757-suter/Suterusu-Protocol.git
```

Link the Sutersusu module to the global `node_modules` directory:
```bash
cd Suterusu-Protocol
npm link
```

In any project where you want to use Suterusu, link the globally installed Suterusu to the local `node_modules` directory:
```bash
## Run this command in your other project root
npm link suterusu 
```



