# Base of the script is taken from https://github.com/rkhal101/Web-Security-Academy-Series/blob/main/sql-injection/lab-01/sqli-lab-01.py

import sys
import urllib3
from lab1 import solve as solve_1
from lab2 import solve as solve_2
from lab3 import solve as solve_3
from lab4 import solve as solve_4
from lab5 import solve as solve_5
from lab6 import solve as solve_6
from lab7 import solve as solve_7
from lab8 import solve as solve_8

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

solve_functions = {
    '01': solve_1,
    '02': solve_2,
    '03': solve_3,
    '04': solve_4,
    '05': solve_5,
    '06': solve_6,
    '07': solve_7,
    '08': solve_8,
}

if __name__ == "__main__":
    try:
        url = sys.argv[1].strip()
        payload = sys.argv[2].strip()
        lab_num = sys.argv[3].strip()
    except IndexError:
        print("[-] Usage: %s <url> <payload> <lab number>" % sys.argv[0])
        print("[-] Example: %s www.example.com \"0=1\" 01" % sys.argv[0])
        sys.exit(-1)

    if lab_num not in solve_functions:
        print("[-] Lab solve function is not yet implemented or does not exist")
        sys.exit(-1)

    if solve_functions[lab_num](url, payload) == True:
        print("[+] SQL Injection successful")
    else:
        print("[-] SQL Injection unsuccessful")

