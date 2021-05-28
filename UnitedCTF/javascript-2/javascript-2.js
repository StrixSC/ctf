let atob = require("atob");

let seed =
  "NzE6NzQ6Njc6Nzg6NDM6NTY6OTY6MjoxMDU6Nzo1MzoxMDU6NTA6NTY6OTg6NTE6OTg6ODM6NDg6OTc6NTU6NTQ6NTY6NjU6MTA1OjEwNDo1MDo4Mzo2MTo4OTo1Mjo2NToxMDE6NjU6NTQ6MTEzOjYyOjM=";
("Njc6NzY6Njk6Nzg6NDU6NTY6OTg6MDoxMDc6NTk6NTc6MTA3OjQ4OjU2Ojk2OjUxOjEwMDo4NTo1MDo4Nzo0Nzo0ODo3MDoxMDA6MTAzOjYxOjU1Ojk3OjYyOjgwOjY4OjEwMTo3MDo1OToxMTQ6NjU6MTAz=");
var key = "2718587a3f";

function encrypt(key, password) {
  var encryptedStrArray = [];
  for (let i = 0; i < password.length; i++) {
    console.log(keyValueAt(key, i));

    encryptedStrArray.push(fuzz(password.charCodeAt(i) ^ keyValueAt(key, i)));
  }
  return encryptedStrArray.join(":");
}

function fuzz(charCodeFromPassword) {
  if (charCodeFromPassword % 2 == 0) return charCodeFromPassword + 3;
  else return charCodeFromPassword - 1;
}

function defuzz(charCodeFromPassword) {
  if (charCodeFromPassword % 2 == 0) {
    return charCodeFromPassword + 1;
  } else return charCodeFromPassword - 3;
}

function keyValueAt(key, index) {
  var tmp;
  var indexModuloKey = index % key.length;
  var letterAtIndex = parseInt(key[indexModuloKey]);
  return (
    letterAtIndex && !isNaN(letterAtIndex)
      ? (tmp = letterAtIndex)
      : (tmp = key.charCodeAt(indexModuloKey)),
    tmp
  );
}

function decrypt(key, password) {
  let plaintext = [];
  let charCodesArr = atob(password).split(":").map(x => parseInt(x));

  console.log(charCodesArr);
  for (let i = 0; i < charCodesArr.length; i++) {
    plaintext.push(defuzz(charCodesArr[i]) ^ keyValueAt(key, i));
  }

  return plaintext.map(x => String.fromCharCode(x)).join('');
}

console.log(decrypt(key, seed));

/*
    1. email === 'admin@local' 
    2. password.length === 38 
    3. encrypt('2718587a3f', password) === NzE6NzQ6Njc6Nzg6NDM6NTY6OTY6MjoxMDU6Nzo1MzoxMDU6NTA6NTY6OTg6NTE6OTg6ODM6NDg6OTc6NTU6NTQ6NTY6NjU6MTA1OjEwNDo1MDo4Mzo2MTo4OTo1Mjo2NToxMDE6NjU6NTQ6MTEzOjYyOjM=

    encrypt(key, password):
        takes every value in the password and XORs the characterCode with a processed number taken from the key
        then joins it and turns it to B64.
       
        exemple: password = 11111111111111111111111111111111111111
        key = '2718587a3f'

        the encrpytion will return: NTA6NTI6NTM6NjM=

    decryption:

        we first must turn it back to charcodes
            1. base64 -> charcode
            2. we now have an array of charCodes
            3. The inverse of XOR is XOR, we then XOR every value in the charCodes array with the keyValueAt(key, index)
            4. the inverse of fuzz(pass.charcodeat(i) ^ keyValueAt(key, i) = defuzz(charCodes[i]) ^ keyValueAt(key, index)

            FLAG-1fbeb0a21f8d1286086ca419079c62f8a
*/
