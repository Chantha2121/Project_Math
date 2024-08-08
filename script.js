function modExp(base, exp, mod) {
    let result = 1;
    base = base % mod;
    while (exp > 0) {
        if (exp % 2 === 1) {
            result = (result * base) % mod;
        }
        exp = Math.floor(exp / 2);
        base = (base * base) % mod;
    }
    return result;
}

function modInverse(e, phi) {
    let m0 = phi, t, q;
    let x0 = 0, x1 = 1;
    if (phi === 1) return 0;
    while (e > 1) {
        q = Math.floor(e / phi);
        t = phi;
        phi = e % phi;
        e = t;
        t = x0;
        x0 = x1 - q * x0;
        x1 = t;
    }
    if (x1 < 0) x1 += m0;
    return x1;
}

function chunkString(str, size) {
    const chunks = [];
    for (let i = 0; i < str.length; i += size) {
        chunks.push(str.slice(i, i + size));
    }
    return chunks;
}

function strToNum(str) {
    return str.split('').reduce((acc, char) => acc * 100 + char.charCodeAt(0), 0);
}

function numToStr(num) {
    let str = '';
    while (num > 0) {
        const charCode = num % 100;
        str = String.fromCharCode(charCode) + str;
        num = Math.floor(num / 100);
    }
    return str;
}

function padNumber(num, length) {
    return num.toString().padStart(length, '0');
}

function encryptMessage() {
    const p = parseInt(document.getElementById('p-value').value);
    const q = parseInt(document.getElementById('q-value').value);
    const e = parseInt(document.getElementById('e-value').value);
    const message = document.getElementById('message').value;

    const n = p * q;
    if (n < 2525) {
        document.getElementById('value-n').innerText = "N is too small. Please choose larger prime numbers.";
        document.getElementById('encrypted-message').innerText = "";
        return;
    }
    document.getElementById('value-n').innerText = n;

    const messageChunks = chunkString(message, 2);
    const encryptedChunks = messageChunks.map(chunk => {
        const chunkValue = strToNum(chunk);
        return modExp(chunkValue, e, n);
    });

    const encryptedMessage = "STOP " + encryptedChunks.map(num => padNumber(num, 4)).join(" ");
    document.getElementById('encrypted-message').innerText = encryptedMessage;

    // Count letters in the message
    countLetters(message);
}

function decryptMessage() {
    const p = parseInt(document.getElementById('p-value').value);
    const q = parseInt(document.getElementById('q-value').value);
    const e = parseInt(document.getElementById('e-value').value);
    const encryptedText = document.getElementById('encrypted-message').innerText;
    const encrypted = encryptedText.replace("STOP ", "").split(" ").map(Number);

    const n = p * q;
    if (n < 2525) {
        document.getElementById('decrypted-message').innerText = "N is too small. Cannot decrypt.";
        return;
    }
    const phi = (p - 1) * (q - 1);
    const d = modInverse(e, phi);

    const decryptedChunks = encrypted.map(num => {
        const decryptedValue = modExp(num, d, n);
        return numToStr(decryptedValue);
    });

    const decryptedMessage = decryptedChunks.join("");
    document.getElementById('decrypted-message').innerText = decryptedMessage;
}

function resetForm() {
    document.getElementById('p-value').value = 43;
    document.getElementById('q-value').value = 59;
    document.getElementById('e-value').value = 13;
    document.getElementById('message').value = "";
    document.getElementById('encrypted-message').innerText = "";
    document.getElementById('decrypted-message').innerText = "";
    document.getElementById('value-n').innerText = 2537;
    document.getElementById('letter-count').innerText = "";
}

function countLetters(str) {
    const letterCounts = Array.from({ length: 26 }, (_, i) => [String.fromCharCode(65 + i), 0]);
    const upperStr = str.toUpperCase();
    for (const char of upperStr) {
        const charCode = char.charCodeAt(0);
        if (charCode >= 65 && charCode <= 90) {
            letterCounts[charCode - 65][1]++;
        }
    }
    document.getElementById('letter-count').innerText = letterCounts.map(item => `${item[0]}: ${item[1]}`).join(', ');
}