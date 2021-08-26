const RazeETH = artifacts.require('RazeETH');
const Client = require('../lib/client_razeeth.js');

contract("RazeETH", async (accounts) => {
    let aliceAccountIdx = 0;
    let bobAccountIdx = 1;
    let alice;
    let bob;

    it("should allow register", async () => {
        let raze = (await RazeETH.deployed()).contract;
        alice = new Client(web3, raze, accounts[aliceAccountIdx]);

        // change epoch to base on time
        await alice.setRoundBase(1);
        await alice.setRoundLen(36);

        await alice.init();
        await alice.register();
        assert.exists(
            alice.account.keypair,
            "Registration failed"
        );

        bob = new Client(web3, raze, accounts[bobAccountIdx]);
        await bob.init();
        await bob.register();
        assert.exists(
            bob.account.keypair,
            "Registration failed"
        );

    });

    it("should allow reading guess", async () => {
        let guess = await alice.getGuess();
        assert.equal(
            guess,
            0,
            "Wrong guess"
        );
    });

    it("should allow funding", async () => {
        await alice.mint(100);
    });

    it("should allow reading balance", async () => {
        let balance = await alice.readBalanceFromContract();
        assert.equal(
            balance,
            100,
            "Wrong balance"
        );
        let localTrackedBalance = alice.account.balance();
        assert.equal(
            balance,
            localTrackedBalance,
            "Contract balance does not match locally tracked balance"
        );
    });

    it("should allow redeeming", async () => {
        await alice.redeem(50); 
        let balance1 = alice.account.balance();
        let balance2 = await alice.readBalanceFromContract(); 
        assert.equal(
            balance1,
            50,
            "Wrong locally tracked balance after redeeming"
        );
        assert.equal(
            balance2,
            50,
            "Wrong contract balance after redeeming"
        );
    });

    it("should allow transfer", async () => {
        let raze = (await RazeETH.deployed()).contract;
        bob = new Client(web3, raze, accounts[bobAccountIdx]);
        await bob.init();
        await bob.register();
        let bobEncoded = bob.account.publicKeyEncoded();
        await alice.transfer(bobEncoded, 25);
        
        console.log("Home balance: ", (await web3.eth.getBalance(accounts[aliceAccountIdx])));
        console.log("Raze balance: ", (await web3.eth.getBalance(raze.options.address)));
        console.log("Agency balance: ", (await web3.eth.getBalance(await raze.methods.raze_agency().call())));

        let aliceBalance = await alice.readBalanceFromContract();
        let bobBalance = await bob.readBalanceFromContract();
        assert.equal(
            aliceBalance,
            25,
            "Wrong balance for alice after transfering"
        );
        assert.equal(
            bobBalance,
            25,
            "Wrong balance for bob after transfering"
        );

        // Need to synchronize bob's account because Truffle test didn't handle events.
        await bob.syncAccountState();
        await bob.redeem(25);
        bobBalance = await bob.readBalanceFromContract();
        assert.equal(
            bobBalance,
            0,
            "Wrong balance for bob after redeeming"
        );
    });

});
