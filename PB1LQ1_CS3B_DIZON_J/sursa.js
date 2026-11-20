
const signupForm = document.getElementById('signupForm');
const statusMsg = document.getElementById('statusMsg');
const results = document.getElementById('results');

signupForm.addEventListener('submit', function (e) {
  e.preventDefault(); // stop the page from reloading

  // Read the form fields 
  const username = document.getElementById('uname').value;
  const password = document.getElementById('pword').value;
  const gender = document.getElementById('gender').value;
  const date = new Date().toLocaleString();

  // Original data
  const originalText = username + ' | ' + password + ' | ' + date +' | ' + gender;
  document.getElementById('originalText').textContent = originalText;

  // status message
  statusMsg.textContent = 'Generating RSA keys, please wait...';
  results.classList.add('hidden');

  setTimeout(function () {
    runRsaDemo(1024, originalText, 'encrypted1024', 'decrypted1024');
    runRsaDemo(3072, originalText, 'encrypted3072', 'decrypted3072');

    statusMsg.textContent = '';
    results.classList.remove('hidden');
  }, 100);
});

//magge generate ng RSA, encrypt and decrypt
function runRsaDemo(keySize, text, encryptedElId, decryptedElId) {
  const crypt = new JSEncrypt({ default_key_size: keySize });
  crypt.getKey(); // generates the public/private key pair

  const encrypted = crypt.encrypt(text);
  const decrypted = crypt.decrypt(encrypted);

  document.getElementById(encryptedElId).textContent = encrypted;
  document.getElementById(decryptedElId).textContent = decrypted;
}
