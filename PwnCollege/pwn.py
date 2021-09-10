from pwn import *
import os

binairies = os.listdir("/opt/babyauto-crackmes/level1")

for b in binairies:
    p = process(b)
    p.sendline('Test')
    b'' == p.recv(timeout=0.01)
    print(b.encode('UTF-8'))
    p.shutdown('send')