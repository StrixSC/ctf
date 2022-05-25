import itertools
import json

start = 11692013098828707274653979175577397281211070056584
end = 703250224969939491157640855358987637009

try:
    with open("hyperlink.json", "r") as f:
        data = json.load(f)
except IOError:
    print("Could not open hyperlink.json")

legal_chars = set("abcdefghijklmnopqrstuvwxyz{}_")
all_links = data["links"]
currents = {}

for key, value in all_links.items():
    current = start
    currents[key] = int("".join(str(int(current & v != 0)) for v in value), 2)

def getAllCombinations():
    str = "abcdefghijklmnopqrstuvwxyz{}_"
    n = len(str)
    opsize = pow(2, n)
    all_perms = []

    for counter in range(1, opsize):
        subs = ""
        for j in range(n):
            if(counter & (1 << j)):
                subs += (str[j])

        print(subs)
        all_perms.append(list(itertools.permutations(subs)))

with open("combinations.txt", "w+") as f:
    f.write(",".join(getAllCombinations()))

