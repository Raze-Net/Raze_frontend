const Client = require("raze");
App = {
  web3Provider: null,
  contracts: {
      razeETHContract: null,
      razeERC20Contract: null,
      erc20TokenContract: null

  },
    razeClient: null,
    alice_address: '0xfb8C80F8143E5baF936fc5c6E73bB07A0a247D10',
    //alice_secret: '22fE54326C85b427E9AC771e3EBbDc23f41aCf5b',
    bob_address: '0xfc71E218fFF23fa5Da59bA02684e9393e84ff523',
    //bob_secret: '10Eb73f9c463fF3302760bF0eFD8bBD7Cc751124',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers
    if (window.ethereum) {
        App.web3Provider = window.ethereum;
        try {
            // Request account access
            await window.ethereum.enable();
        } catch (error) {
            // User denied account access
            console.error("User denied account access");
        }
        console.log("using modern dapp browser");
    }
    // Legacy dapp browsers
    else if (window.web3) {
        App.web3Provider = window.web3.currentProvider;
        console.log("using legacy dapp browser");
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
        //App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        App.web3Provider = new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/f0133270d95d492aa5d4bb8944b36bc6");
        console.log("using ropsten");
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: async function() {
      /* Ropsten Testnet contract addresses */
      let razeETHabi = (await $.getJSON('RazeETH.json')).abi;
      App.contracts.razeETHContract = new web3.eth.Contract(razeETHabi, '0x8DB0F612193D14A44c71bc58d3d89064a7545ebE');
      App.contracts.razeETHContract.setProvider(App.web3Provider);

      let razeERC20abi = (await $.getJSON('RazeERC20.json')).abi;
      App.contracts.razeERC20Contract = new web3.eth.Contract(razeERC20abi, '0x2B27cd5BF14fC2e138A2456B9b30A1aC51926839');
      App.contracts.razeERC20Contract.setProvider(App.web3Provider);

      let erc20abi = (await $.getJSON('TestRazeToken.json')).abi;
      App.contracts.erc20TokenContract = new web3.eth.Contract(erc20abi, '0xf4E4457b708A2d3EE05E89F62fF119515029e9e8');
      App.contracts.erc20TokenContract.setProvider(App.web3Provider);


      /* HECO Testnet contract addresses */
      //let suterETHabi = (await $.getJSON('SuterETH.json')).abi;
      //App.contracts.suterETHContract = new web3.eth.Contract(suterETHabi, '0x7524703c59d8dac3a5D3eF64D934514705A8D307');
      //App.contracts.suterETHContract.setProvider(App.web3Provider);

      //let suterERC20abi = (await $.getJSON('SuterERC20.json')).abi;
      //App.contracts.suterERC20Contract = new web3.eth.Contract(suterERC20abi, '0x1B284E1A34CA1FA30732D58442d4bb74Dc609E82');
      //App.contracts.suterERC20Contract.setProvider(App.web3Provider);

      //let erc20abi = (await $.getJSON('TestERC20Token.json')).abi;
      //App.contracts.erc20TokenContract = new web3.eth.Contract(erc20abi, '0x840D4c4477959c9976A81a5c2155d0A4CB3fFD9F');
      //App.contracts.erc20TokenContract.setProvider(App.web3Provider);

      /* BSC Testnet contract addresses */
      //let suterETHabi = (await $.getJSON('SuterETH.json')).abi;
      //App.contracts.suterETHContract = new Client.Web3Contract(new web3.eth.Contract(suterETHabi, '0x84AF4AD1A862c914A7c5Cf6C3752625F2F21dC6f'));
      //App.contracts.suterETHContract.setProvider(App.web3Provider);

      //let suterERC20abi = (await $.getJSON('SuterERC20.json')).abi;
      //App.contracts.suterERC20Contract = new web3.eth.Contract(suterERC20abi, '0x840D4c4477959c9976A81a5c2155d0A4CB3fFD9F');
      //App.contracts.suterERC20Contract.setProvider(App.web3Provider);

      //let erc20abi = (await $.getJSON('TestERC20Token.json')).abi;
      //App.contracts.erc20TokenContract = new web3.eth.Contract(erc20abi, '0x19124e09A7A5ea05b0B9e6aD6ff6f72E85a19778');
      //App.contracts.erc20TokenContract.setProvider(App.web3Provider);


      return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '#initETHButton', (event) => {
        App.initRazeEthClient();
    });
    $(document).on('click', '#registerETHButton', (event) => {
        App.razeEthRegister();
    });
    $(document).on('click', '#depositETHButton', (event) => {
        App.razeEthDeposit();
    });

    $(document).on('click', '#withdrawETHButton', (event) => {
        App.razeEthWithdraw();
    });
    $(document).on('click', '#transferETHButton', (event) => {
        App.razeEthTransfer();
    });
    $(document).on('click', '#balanceETHButton', (event) => {
        App.razeEthBalance();
    });
    $(document).on('click', '#addressETHButton', (event) => {
        App.razeEthAddress();
    });



      $(document).on('click', '#mintERC20Button', (event) => {
          App.mintERC20Token();
      });

    $(document).on('click', '#initERC20Button', (event) => {
        App.initRazeERC20Client();
    });
    $(document).on('click', '#registerERC20Button', (event) => {
        App.razeERC20Register();
    });
    $(document).on('click', '#depositERC20Button', (event) => {
        App.razeERC20Deposit();
    });

    $(document).on('click', '#withdrawERC20Button', (event) => {
        App.razeERC20Withdraw();
    });
    $(document).on('click', '#transferERC20Button', (event) => {
        App.razeERC20Transfer();
    });
    $(document).on('click', '#balanceERC20Button', (event) => {
        App.razeERC20Balance();
    });
    $(document).on('click', '#addressERC20Button', (event) => {
        App.razeERC20Address();
    });

  },

    initRazeEthClient: async function ()  {
        let accounts = await web3.eth.getAccounts();
        console.log('accounts: ', accounts);
        this.razeEthClient = new Client.ClientRazeETH(
            web3,
            App.contracts.razeETHContract,
            accounts[0] 
        );
        await this.razeEthClient.init();

        //if (accounts[0] == this.alice_address)
            //this.secret = this.alice_secret;
        //else if (accounts[0] == this.bob_address)
            //this.secret = this.bob_secret;

        // Use the address without '0x' as the secret
        this.secret = accounts[0].slice(2);
        console.log("Initialization completed.");
    },

    razeEthRegister: async function () {
        await this.razeEthClient.register(this.secret);
        console.log(
            'keypair: ',
            this.razeEthClient.account.keypair
        );
    },

    razeEthDeposit: async function () {
        await this.razeEthClient.register(this.secret);
        await this.razeEthClient.mint(10);
    },

    razeEthWithdraw: async function () {
        await this.razeEthClient.register(this.secret);
        await this.razeEthClient.redeem(5);
    },

    razeEthBalance: async function () {
        console.log('this.secret: ', this.secret);
        await this.razeEthClient.register(this.secret);
        let balance = await this.razeEthClient.readBalanceFromContract();
    },

    razeEthAddress: async function () {
        console.log('raze address: ', this.razeEthClient.account.publicKeyEncoded());
    },

    razeEthTransfer: async function () {
        var address = $('#TransferRazeETHAddress').val();
        var decoys = $('#TransferRazeETHDecoys').val();
        if (decoys != undefined)
            decoys = decoys.split(',').filter(x => x!='');
        await this.razeEthClient.transfer(address, 5);
    },

    


    mintERC20Token: async function () {
        let accounts = await web3.eth.getAccounts(); 
        await new Promise((resolve, reject) => {
            App.contracts.erc20TokenContract.methods.mint(accounts[0], "20000000000000000000000000")
                .send({from: accounts[0], gas: 4700000})
                .on('transactionHash', (hash) => {
                    console.log("Mint submitted (txHash = \"" + hash + "\").");
                })
                .on("receipt", (receipt) => {
                    App.contracts.erc20TokenContract.methods.balanceOf(accounts[0])
                        .call()
                        .then((result) => {
                            console.log("ERC20 funds minted (balance = " + result + ").");
                            resolve(receipt);
                        });
                })
                .on("error", (error) => {
                    reject(error);
                });
        });
    },

    initRazeERC20Client: async function ()  {
        let accounts = await web3.eth.getAccounts();
        console.log('accounts: ', accounts);
        this.razeERC20Client = new Client.ClientRazeERC20(
            web3,
            App.contracts.razeERC20Contract,
            accounts[0],
            App.contracts.erc20TokenContract
        );
        await this.razeERC20Client.init();

        //if (accounts[0] == this.alice_address)
            //this.secret = this.alice_secret;
        //else if (accounts[0] == this.bob_address)
            //this.secret = this.bob_secret;

        // Use the address without '0x' as the secret
        this.secret = accounts[0].slice(2);
        console.log("Initialization completed.");
    },

    razeERC20Register: async function () {
        await this.razeERC20Client.register(this.secret);
        console.log(
            'keypair: ',
            this.razeERC20Client.account.keypair
        );
    },

    razeERC20Deposit: async function () {
        await this.razeERC20Client.register(this.secret);
        await this.razeERC20Client.mint(10);
    },

    razeERC20Withdraw: async function () {
        await this.razeERC20Client.register(this.secret);
        await this.razeERC20Client.redeem(5);
    },

    razeERC20Balance: async function () {
        console.log('this.secret: ', this.secret);
        await this.razeERC20Client.register(this.secret);
        let balance = await this.razeERC20Client.readBalanceFromContract();
    },

    razeERC20Address: async function () {
        console.log('raze address: ', this.razeERC20Client.account.publicKeyEncoded());
    },

    razeERC20Transfer: async function () {
        var address = $('#TransferRazeERC20Address').val();
        var decoys = $('#TransferRazeERC20Decoys').val().split(',').filter(x => x!='');
        await this.razeERC20Client.transfer(address, 5, decoys);
    },



};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
