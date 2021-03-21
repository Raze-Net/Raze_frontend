# Raze Frontend
> <img alt="" padding="10 0" src="https://github.com/Raze-Net/Raze_website/blob/main/favicon.png" height="20"> Raze Network
> [raze.network](https://www.raze.network/)

This repo will present the front end and UI that can interact with Raze protocol. We will implement the client that supports the Register, CreateMintTx, CreateTransferTx, CreateRedeemTx, CreateLockTx, and CreateUnlockTx algorithms. The client will be able to generate the necessary transactions to trigger the corresponding substrate modules. The transaction will include all the zero-knowledge proofs generated for these modules. We will provide a basic UI to take inputs from the users for the proof generation algorithms.

Each raze user can register a raze account any time(s) he wishes. The registration algorithm CreateAddress generates a secret key `sk` and the corresponding public key `pk`. The public key is the identifier of the Raze account.

To invoke the Mint contract, the client-side runs a CreateMintTx algorithm, which takes as input the raze account `pk` and the amount of native token `amt` as inputs. The output of the CreateMintTx algorithm is a ciphertext `cp_1` encrypted under the public key `pk`. If the raze account `pk` is already attached with a ciphertext `cp_0`, the newly created ciphertext will be homomorphically added to the existing ciphertext to increase the encrypted amount. The updated ciphertext will be formed as `cp_1*cp_0`. Otherwise, the new ciphertext will be attached to the raze account. The native token will be stored in the mint contract.

To invoke the transfer contract, the client-side runs a CreateTransferTx algorithm, which takes as inputs the raze account secret key `sk`, and the amount of transferred token `amt`, the public keys of sender `pk_s`, receiver `pk_r` and the public keys of the anonymity set `{pk_a}`. The output of the CreateTransferTx algorithm is a zero-knowledge proof that the prover knows one of the secret keys of the aforementioned public key set, the payment consistency proof, and range proof. The statement of this zkp is 
<p align="center">
  <img src="https://github.com/razenetwork/Raze_Network/blob/main/image/image3.png" alt="" width="60%"/>
</p>

The client-side runs a CreateRedeemTx algorithm to invoke the redeem contract. It takes the account secret key `sk`, the withdrawal amount `amt`, and the public key `pk` as input to generate a zero-knowledge proof showing that the user knows the secret key `sk` for the account public key `pk` and the account has enough balance for the redeem operation. The zero-knowledge proof will be used to invoke the redeem contract. The statement of this zkp is
<p align="center">
  <img src="https://github.com/razenetwork/Raze_Network/blob/main/image/image4.png" alt="" width="40%"/>
</p>

The concrete design of the ZKP algorithms is a twist of the schemes proposed in the last two figures of the Zether paper: https://eprint.iacr.org/2019/191.pdf on Page 41 and 42 respectively. The main difference is that the burn-proof on Page 41 only considers the case where the user withdraws all the money in the account while our statement considers the case where the user might withdraw an amount smaller than the balance and the ConfTransfer proof on Page 42 does not consider the one-out-of-many proof part while ours does. 
