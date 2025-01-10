import {
    Transaction,
    SystemProgram,
    Connection,
    Keypair,
    sendAndConfirmTransaction,
    PublicKey,
  } from "@solana/web3.js";
  import wallet from "./dev-wallet.json";
  
  const from = Keypair.fromSecretKey(new Uint8Array(wallet)); // Load dev wallet
  const to = new PublicKey("AECgSpfrxmn75JV2MpenyxXJHn74ik5bUztax46A5xo5"); // Turbin3 wallet
  const connection = new Connection("https://api.devnet.solana.com"); // Solana devnet connection
  
  (async () => {
    try {
      // Step 1: Get balance of the dev wallet
      const balance = await connection.getBalance(from.publicKey);
  
      // Step 2: Create a mock transaction to calculate the fees
      const mockTransaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: from.publicKey,
          toPubkey: to,
          lamports: balance, // All lamports
        })
      );
      mockTransaction.recentBlockhash = (await connection.getLatestBlockhash("confirmed")).blockhash;
      mockTransaction.feePayer = from.publicKey;
  
      const fee =
        (await connection.getFeeForMessage(mockTransaction.compileMessage(), "confirmed")).value || 0;
  
      // Step 3: Recalculate lamports to transfer after deducting fees
      mockTransaction.instructions.pop(); // Remove the mock transfer instruction
      const adjustedLamports = balance - fee; // Adjusted lamports to send
  
      if (adjustedLamports <= 0) {
        console.log("Not enough balance to cover transaction fees.");
        return;
      }
  
      // Step 4: Create the final transaction with adjusted lamports
      const finalTransaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: from.publicKey,
          toPubkey: to,
          lamports: adjustedLamports,
        })
      );
      finalTransaction.recentBlockhash = mockTransaction.recentBlockhash;
      finalTransaction.feePayer = from.publicKey;
  
      // Step 5: Sign, send, and confirm the transaction
      const signature = await sendAndConfirmTransaction(connection, finalTransaction, [from]);
  
      console.log(
        `Success! Check out your TX here: https://explorer.solana.com/tx/${signature}?cluster=devnet`
      );
    } catch (e) {
      console.error(`Oops, something went wrong: ${e}`);
    }
  })();
  