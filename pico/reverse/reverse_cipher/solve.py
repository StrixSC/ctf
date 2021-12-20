#!/usr/bin/python3

flag = "";
reverse = "w1{1wq84fb<1>49"

for i in range(len(reverse)):
    if i & 1 == 0:
        flag = flag + chr(ord(reverse[i]) - 5)
    else:
        flag = flag + chr(ord(reverse[i]) + 2)

print("picoCTF{" + flag + "}")

