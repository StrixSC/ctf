
## Hacker101 writeup

All flags are prefixed with ``^FLAG^``

### Level 1 
 Flag is located at the url used for the background of the page.

### Level 2

* 2.1 : 
	flag is updated onto the button element on the "testing" page. It gets updated there
	once the button has been injected with script.
	        <button onclick="alert(1)"></button> example
	``` c20177d1aa74ba1d33a50df580d55ee48b69de3da7d6e457353637d35caae592$FLAG$```


* 2.2 : 
	for the next flag you have to inject script into the title of any created page. 
	Once you go back on the home page, an alert will go off with the next flag in.
	    Title: <script>alert(1)</script>
	Save the page and then go back to the home page and an alert will pop up.

	```82b87de2e8d3d272b6bfc326281ce128f64717933c939dd869d0594f88d6dd46```

* 2.3 :
	    if you take a look at the page numbers when editing each created page, you will see that they don't count up properly.
	    in my case, it went from page 3 to 10. What is happening with the 7 pages in between? 
	    Check through manually by typing out url/page/edit/{#page number} and you'll find a page that is being edited and that contains
	    the flag. 
	```26b9d5b65871a0838e5b7a2f13f3d2ff815cdfcf2b1df6507da08d59d23d2760```

* 2.4 : 
    had to use hint for this one: make sure to tamper with every input. 
    after trying XSS with many pages, titles and bodies and not getting anything, I figured the only other input was the URL. 
    So after messing with the url of an edit page adding a ' sign returns a page containing a flag.
    trying with other inputs doesnt work such as %, !, ?, `, \, ", etc. They all get sanitized. The only one that really worked was ' 

### Level 3

* 3.1 : 

	first instinct was sqli.

	It says on one of the pages that the user must be an admin to edit pages, so lets sqli into it. 
	Rulebook sql ' or 1=1 works fine we get a page that shows us the exact query used to get all the members.

	we get a large amount of information through the query: 
	    SELECT password FROM admins WHERE username=\' %s \' ' % request.form['username'].replace('%', '%%'))
	I didnt waste any time, I intercepted the post request with burp and copied the payload onto a file which I then used with sqlmap
	to get the flag.

	``$ sqlmap -r sqli.txt title username --dump``

	this gave me the first flag in a few minutes.

	``fe246ba5db4981ec2bbc0aa25f414ce4c80698728fb52bb3330e9d129b998736``

* 3.2:

	also happens to give you the username and the password that sqlmap either inserted into the db or got from it, I couldn't be bothered to find out.

	for my instance of the ctf it retreived/inserted asheley:hermila

	This is important because it leads you to another flag which is obtained by manually logging in with the given username and password. 


	``b56369fd6a82d683de1d8b6a9e6d986eb83e0061d9fefd492eb950d56a679338``

* 3.3:

	For this one, I assumed it was gonna be xss since Micro-CMS v1 was mainly xss. I wanted to edit the page, but I couldn't because I wasn't admin, and inputing the previously retrieved password and username does not log you in. 

	anyway the easiest way to do this is with curl or any 
	html request application. I used burp (obviously).

	Intercept the "edit page" link and update the request to be a POST request instead:

	make sure to include the title and the body tags in the header of the request. 

	Title and body were the two tags used in Micro-CMS v1 whenever POST requests were sent to edit a page. 

	something like this should work :

	title=<script>alert()</script>&body=<button onclick="alert(1)"></button>

	this should give you the flag once the interception has been forwarded:

	flag:
	^FLAG^eac35ec680dc76d1521f122b6cd718a006de6a5722eb4f80f1ac84b0d29a2f61$FLAG$


### Level 4

* 4.1

	The url is really obviously exploitable. We can get the first flag just by changing any value from the encryption and sending the post request. 

	``74517bf97d7c49b51aab61f212fa25cada2881c6ba89e9c4ce1d8a08f896761e``

* 4.2: 

	Looking at one of the hints, it says that the next flag has to do with an attack described in one of hacker101's crypto attack youtube tutorial video. 

	After checking that out, it talked about *reused key attacks*, which I assumed is what needed to be done.  
