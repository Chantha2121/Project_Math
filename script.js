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

function encryptMessage() {
    const p = parseInt(document.getElementById('p-value').value);
    const q = parseInt(document.getElementById('q-value').value);
    const e = parseInt(document.getElementById('e-value').value);
    const message = document.getElementById('message').value;
    
    const n = p * q;
    document.getElementById('value-n').innerText = n;

    const encrypted = message.split("").map(char => {
        const asciiValue = char.charCodeAt(0);
        return modExp(asciiValue, e, n);
    }).join(" ");
    
    document.getElementById('encrypted-message').innerText = encrypted;
}

function decryptMessage() {
    const p = parseInt(document.getElementById('p-value').value);
    const q = parseInt(document.getElementById('q-value').value);
    const e = parseInt(document.getElementById('e-value').value);
    const encrypted = document.getElementById('encrypted-message').innerText.split(" ").map(Number);
    
    const n = p * q;
    const phi = (p - 1) * (q - 1);
    const d = modInverse(e, phi);
    
    const decrypted = encrypted.map(num => {
        const decryptedAscii = modExp(num, d, n);
        return String.fromCharCode(decryptedAscii);
    }).join("");
    
    document.getElementById('decrypted-message').innerText = decrypted;
}

function resetForm() {
    document.getElementById('p-value').value = 61;
    document.getElementById('q-value').value = 53;
    document.getElementById('e-value').value = 17;
    document.getElementById('message').value = "";
    document.getElementById('encrypted-message').innerText = "";
    document.getElementById('decrypted-message').innerText = "";
    document.getElementById('value-n').innerText = 3233;
}
