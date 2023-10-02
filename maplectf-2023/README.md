# JaVieScript - Maple CTF 2023
<img src="https://github.com/StrixSC/ctf/assets/29717413/ce5e78d7-12ac-4178-80c1-c9aa467412dc" alt="Logo Strix.Site" width="15%" align="right" />

## Challenge

The challenge provides two source files: 

1. checker.js: The JavaScript code to reverse.
2. index.html:  Simple HTML file containing a `<script>` tag that links to `checker.js`

### Checker.js

The Checker.js contains the code that we have to understand and reverse engineer in order to get the flag. 

```javascript
var flag = "maple{";
var honk = {};

async function hash(string) {
	const utf8 = new TextEncoder().encode(string);
	const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray
	  .map((bytes) => bytes.toString(16).padStart(2, '0'))
	  .join('');
	return hashHex;
  }
```
The method named "hash" is an asynchronous JavaScript function that computes the SHA-256 hash value of a given string. (Thanks GPT-3.5). Immediately after looking at the code that this was most definitely not the thing we have to try to reverse. 

The other method in the file can be split into four sections:

1. ```javascript
   async function constructflag() {
	const urlParams = new URLSearchParams(window.location.search);
	var fleg = "maple{";
	for (const pair of urlParams.entries()) {
		honk[pair[0]] = JSON.parse(pair[1]); 
	}

	if (honk.toString() === {}.toString()) {
		fleg += honk.toString()[9];
	}

   // ... 

   ```
   For this first part, we can already identify the input being the url parameters. The input is taken from the `search` property of `window.location` and is then parsed in some way using a for loop to populate the previously defined object `honk`. It is then expected that the query parameters provided in the URL be JSON parsable values;

   Something like this: `localhost:5000/index.html?"[property_name]"=[property_value]`, where `[property_value]` is a valid JSON type, so numbers, arrays, objects or strings.

   We can also notice that a flag is created through the `fleg` variable. It is set to the `maple{`.
2. 	```javascript
      if (Object.keys(honk).length === 0) {
        const hookOne = eval(honk.one);
        if (typeof hookOne === 'number' && hookOne * hookOne + '' && !/\d/.test(hookOne)) {
          fleg += 'a' + hookOne.toString()[0];
        }
    // ...
    ```
    For this second part, we can see that if the condition passes, the program makes modifications to the `fleg` variable, adding an "a" as well the value at the first index of the hookOne property of the input, when turned to String. I will dissect and expand this further in the next section.
   	 
3. ```javascript
    const quack = honk.two;
		if ( quack.toString().length === 0 && quack.length === 1 ) {
			fleg += 'a' + (quack[0] + '')[0].repeat(4) + 'as';	// Here, the 
		}
   // ...
    ```
   For this third section, we have another condition that if passed will cause the `fleg` variable to be modified, adding an `a` as well as a few other values directly to the string.
    
4. ```javascript
    const hiss = honk.three;
      if (hiss === "_are_a_mId_FruiT}") {
        fleg += hiss;
      }
    }
   
    if (await hash(fleg) == "bfe06d1e92942a0eca51881a879a0a9aef3fe75acaece04877eb0a26ceb8710d") {
      console.log(fleg);
    }
    }
    ```
   Finally, for this last section, we can see that if the if-statement passes, there will be another update to the `fleg` variable, adding the string `_are_a_mId_FruiT}` to it. Judging from the last curly brace, we can assume that this is the ending of the flag.

   There is a last if-statement that calls the hash method on the `fleg` variable in order to check it's value against a provided hash `bfe06d1e92942a0eca51881a879a0a9aef3fe75acaece04877eb0a26ceb8710d`, we can assume that this is hash is the hashed version of the flag. 

## Writeup

This challenge is a reverse engineering challenge that required a lot of dynamic analysis. Through out the challenge, I leveraged the [DevTools](https://developer.chrome.com/docs/devtools/)'s debugger in order to view the current state of the execution one by one. 

![image](https://github.com/StrixSC/ctf/assets/29717413/18ec7566-1e0e-4f32-ac7c-a91f3c5938de)


