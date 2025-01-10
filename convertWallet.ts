import bs58 from "bs58";

// Replace this with your Base58 private key from Phantom
const privateKeyBase58 = "4Q5aSAXZW9fn6TL4r3vNeqkApGbrHGapqCafC9Kzavf48WqfZ9oBLkpJJAvk6x59GVgH4TDPo32ktGvKKA3ZjRUo";

try {
    // Decode the Base58 private key to a Uint8Array
    const privateKeyByteArray = bs58.decode(privateKeyBase58);

    // Convert the Uint8Array to a standard number array
    const privateKeyNumberArray = Array.from(privateKeyByteArray);

    // Print the result
    console.log("Private Key Array:", JSON.stringify(privateKeyNumberArray));
} catch (error) {
    console.error("Error decoding private key:", error);
}
