function modExp(base, exponent, modulus) {
    let result = 1;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2 == 1) { // If exponent is odd, multiply base with result
            result = (result * base) % modulus;
        }
        exponent = Math.floor(exponent / 2); // Divide exponent by 2
        base = (base * base) % modulus; // Square the base
    }
    return result;
}

// Function to convert a letter pair to a number based on the given mapping
function lettersToNumber(letters) {
    let first = letters.charCodeAt(0) - 'A'.charCodeAt(0); // Convert first letter
    let second = letters.charCodeAt(1) - 'A'.charCodeAt(0); // Convert second letter
    return first * 100 + second;
}

// RSA encryption function
function encryptRSA(message, n, e) {
    let encryptedBlocks = [];
    for (let i = 0; i < message.length; i += 2) {
        let block = message.substring(i, i + 2);
        let numericValue = lettersToNumber(block);
        let encryptedValue = modExp(numericValue, e, n);
        encryptedBlocks.push(encryptedValue);
    }
    return encryptedBlocks;
}

// Parameters for RSA encryption
let n = 2537;
let e = 13;
let message = "STOP";

// Encrypt the message
let encryptedMessage = encryptRSA(message, n, e);

console.log("Encrypted message:", encryptedMessage.join(" "));