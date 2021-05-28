## OverTheWire's Krypton
###### January 13th 2020
###### Play here: https://overthewire.org/wargames/bandit/

#### Writeup

##### Level 0-1

For this level, we are given a string in base64 that we have to decode and use as the password to ssh into the krypton1 user on the remote server.

Running this command (s.sh is a custom script that uses sshpass and allows us to dynamically set passwords) gets us in. The next challenge is at /krypton/krypton1 as stated in the prompt
```
[strix@arch src]$ ./s.sh krypton1 $(echo "S1JZUFRPTklTR1JFQVQ=" | base64 -d)
```

##### Level 1-2

Given a string that is rotated 13 times, we need to decode it and use it as the password for the next user.

Very simple, as this challenge resembles the one from Bandit.

```
krypton1@krypton:/krypton/krypton1$ cat krypton2 
YRIRY GJB CNFFJBEQ EBGGRA
```

To rotate it, we can use the tr utility:

```
krypton1@krypton:/krypton/krypton1$ cat krypton2 | tr [A-Za-z] [N-ZA-Mn-za-m]
LEVEL TWO PASSWORD ROTTEN
```

##### Level 2-3

For this level, it's necessary to create a tmp directory under ```/tmp/``` and work in there. You can follow the example given on the website:

```
krypton2@melinda:~$ mktemp -d
/tmp/tmp.Wf2OnCpCDQ
krypton2@melinda:~$ cd /tmp/tmp.Wf2OnCpCDQ
krypton2@melinda:/tmp/tmp.Wf2OnCpCDQ$ ln -s /krypton/krypton2/keyfile.dat
krypton2@melinda:/tmp/tmp.Wf2OnCpCDQ$ ls
keyfile.dat
krypton2@melinda:/tmp/tmp.Wf2OnCpCDQ$ chmod 777 .
krypton2@melinda:/tmp/tmp.Wf2OnCpCDQ$ /krypton/krypton2/encrypt /etc/issue
krypton2@melinda:/tmp/tmp.Wf2OnCpCDQ$ ls
ciphertext  keyfile.dat
```

After that, we need to understand the prompt. We are given a ciphertext in the ```krypton3``` file. We know it was encrypted using some sort of Caesar substitution. We're also given a key that we need to decipher the text and recover the plaintext. We don't have access to the contents of the key, but we can use it with the utility that will encrypt anything we give it. This just became very easy. Caesar ciphers are simple shifting ciphers. We can use them to turn some text into a weird unreadable form, basically encode them. However, to recover the plaintext, we need to know how much the text was shifted by.

This is where the ```encrypt``` utility will come in handy. Since it knows the key, we can use it to find out what the rotation is: 

```
krypton2@krypton:/tmp/strixkrypton2$ echo "A" > plaintext.txt
krypton2@krypton:/tmp/strixkrypton2$ /krypton/krypton2/encrypt plaintext.txt
krypton2@krypton:/tmp/strixkrypton2$ printf "$(cat ciphertext)\n"

M
```

Now we know that if we input the letter A, the ciphertext will be M. This means that there is a shift of 12 characters, a ROT12. Similar to the previous level, we can use an online converter or the ```tr``` utility:

```
cat /krypton/krypton2/krypton3 |  tr ‘m-za-lM-ZA-L’ ‘a-zA-Z’
```
This will successfully give us the password for the next level.

Also, here is a list of all the rotation algorithms with the ```tr``` utility: 

```
ROT-1 = tr ‘b-za-aB-ZA-A’ ‘a-zA-Z’.
ROT-2 = tr ‘c-za-bC-ZA-B’ ‘a-zA-Z’.
ROT-3 = tr ‘d-za-cD-ZA-C’ ‘a-zA-Z’
ROT-4 = tr ‘e-za-dE-ZA-D’ ‘a-zA-Z’
ROT-5 = tr ‘f-za-eF-ZA-E’ ‘a-zA-Z’
ROT-6 = tr ‘g-za-fG-ZA-F’ ‘a-zA-Z’
ROT-7 = tr ‘h-za-gH-ZA-G’ ‘a-zA-Z’
ROT-8 = tr ‘i-za-hI-ZA-H’ ‘a-zA-Z’
ROT-9 = tr ‘-za-iJ-ZA-I’ ‘a-zA-Z’
ROT-10 = tr ‘k-za-jK-ZA-J’ ‘a-zA-Z’
ROT-11 = tr ‘l-za-kL-ZA-K’ ‘a-zA-Z’
ROT-12 = tr ‘m-za-lM-ZA-L’ ‘a-zA-Z’
ROT-13 = tr ‘n-za-mN-ZA-M’ ‘a-zA-Z’
ROT-14 = tr ‘o-za-nO-ZA-N’ ‘a-zA-Z’
ROT-15 = tr ‘p-za-oP-ZA-O’ ‘a-zA-Z’
ROT-16 = tr ‘q-za-pQ-ZA-P’ ‘a-zA-Z’
ROT-17 = tr ‘r-za-qR-ZA-Q’ ‘a-zA-Z’
ROT-18 = tr ‘s-za-rS-ZA-R’ ‘a-zA-Z’
ROT-19 = tr ‘t-za-sT-ZA-S’ ‘a-zA-Z’
ROT-20 = tr ‘u-za-tU-ZA-T’ ‘a-zA-Z’
ROT-21 = tr ‘v-za-uV-ZA-U’ ‘a-zA-Z’
ROT-22 = tr ‘w-za-vW-ZA-V’ ‘a-zA-Z’
ROT-23 = tr ‘x-za-wX-ZA-W’ ‘a-zA-Z’
ROT-24 = tr ‘y-za-xY-ZA-X’ ‘a-zA-Z’
ROT-25 = tr ‘z-za-yZ-ZA-Y’ ‘a-zA-Z’
```
[source](https://www.chmag.in/articles/momsguide/decoding-rot-using-the-echo-and-tr-commands-in-your-linux-terminal/)

##### Level 3-4

Prompt: 

In this example, the cipher mechanism is not available to you, the attacker. However, you have been lucky.  You have intercepted more than one message.  The password to the next level is found in the file 'krypton4'.  You have also found 3 other files. (found1, found2, found3)

You know the following important details:

- The message plaintexts are in English (*** very important)
- They were produced from the same key (*** even better!)

