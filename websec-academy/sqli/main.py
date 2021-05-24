# Base of the script is taken from https://github.com/rkhal101/Web-Security-Academy-Series/blob/main/sql-injection/lab-01/sqli-lab-01.py

import sys
import urllib3
from lab1 import solve as solve_1
from lab2 import solve as solve_2

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

solve_functions = {
    '1': solve_1,
    '2': solve_2
}

if __name__ == "__main__":
    try:
        url = sys.argv[1].strip()
        payload = sys.argv[2].strip()
        lab_num = sys.argv[3].strip()
    except IndexError:
        print("[-] Usage: %s <url> <payload> <lab number>" % sys.argv[0])
        print("[-] Example: %s www.example.com \"1=1\" 01" % sys.argv[0])
        sys.exit(-1)

    if lab_num not in solve_functions:
        print("[-] Lab solve function is not yet implemented or does not exist")
        sys.exit(-1)
    
    if solve_functions[lab_num](url, payload) == True:
        print("[+] SQL Injection successful")
    else:
        print("[-] SQL Injection unsuccessful")