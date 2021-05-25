# Strix | Ringzer0

import os
from pwn import *
from requests import *
import ringzer0
from chal13 import solve as solve_13
from chal14 import solve as solve_14
from chal56 import solve as solve_56
from chal17 import solve as solve_17
from chal126 import solve as solve_126
from chal32 import solve as solve_32

solve_functions = {
    '13': solve_13,
    '14': solve_14,
    '17': solve_17,
    '32': solve_32,
    '56': solve_56,
    '126': solve_126
}

def main():
    session = ringzer0.login()
    try:
        chal_num = os.environ.get("CHALLENGE_NUMBER")
        print(chal_num)
    except IndexError:
        print("[-] Usage: %s <challenge number>" % sys.argv[0])
        print("[-] Example: %s 01" % sys.argv[0])
        sys.exit(-1)

    if chal_num not in solve_functions:
        print("[-] Challenge solve function is not yet implemented or does not exist")
        sys.exit(-1)

    print("[+] Starting solve for challenge number %s" % chal_num)
    solve_functions[chal_num](s=session)

if __name__ == '__main__':
    main()
