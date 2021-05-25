# Ringzer0CTF Writeups and challenge solutions

Here are my solutions and writeups for the [RingZer0CTF](https://ringzer0ctf.com/)

All of the solutions have been encrypted with aes-256-cbc, a very good idea that [Eur0pa](https://github.com/eur0pa) uses on GitHub, to prevent cheating. 

To decrypt them, use the FLAG and this [utility](https://github.com/StrixSC/scripts/blob/main/aes-encrypt), or with [OpenSSL](https://www.openssl.org/) using this command

```sh
openssl enc -aes-256-cbc -md sha512 -iter 10000 -salt -d -in <WRITEUP/SOLUTION> -out <OUTPUT_FILE> -k <PASSPHRASE>
```