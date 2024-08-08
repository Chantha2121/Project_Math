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

    const messageChunks = chunkString(message, 4);
    const encryptedChunks = messageChunks.map(chunk => {
        const chunkValue = chunk.split("").reduce((acc, char) => acc * 256 + char.charCodeAt(0), 0);
        return modExp(chunkValue, e, n);
    });

    const encryptedMessage = encryptedChunks.join(" ");
    document.getElementById('encrypted-message').innerText = encryptedMessage;
}

function decryptMessage() {
    const p = parseInt(document.getElementById('p-value').value);
    const q = parseInt(document.getElementById('q-value').value);
    const e = parseInt(document.getElementById('e-value').value);
    const encrypted = document.getElementById('encrypted-message').innerText.split(" ").map(Number);

    const n = p * q;
    if (n < 2525) {
        document.getElementById('decrypted-message').innerText = "N is too small. Cannot decrypt.";
        return;
    }
    const phi = (p - 1) * (q - 1);
    const d = modInverse(e, phi);

    const decryptedChunks = encrypted.map(num => {
        const decryptedValue = modExp(num, d, n);
        let decryptedChunk = "";
        while (decryptedValue > 0) {
            decryptedChunk = String.fromCharCode(decryptedValue % 256) + decryptedChunk;
            decryptedValue = Math.floor(decryptedValue / 256);
        }
        return decryptedChunk;
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
    document.getElementById('value-n').innerText = 3233;
}