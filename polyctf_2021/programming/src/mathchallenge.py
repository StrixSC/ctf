# StrixSC | Math Challenge | 24H@CTF (PolyHx) 20-02-2021

import inflect
from pwn import *

url = "challenges.ctfd.io"
port = 30510
r = remote(url, port)
p = inflect.engine()

# Initial connection handshake + Sending OK
print(r.recv())
r.send("\n")

operations = ["minus", "plus", "times", "over"]
operDict = {
    'plus' : '+',
    'minus' : '-',
    'times' : '*',
    'over' : '/',
}

def createFormula(string):
    words = string.split(" ")
    newWords = []
    tmp = ""
    for word in words:
        if word in operations:
            newWords.append(tmp.strip())
            newWords.append(word.strip())
            tmp = ""
        else:
            tmp += word + " "

        if words.index(word) == len(words)-1:
            newWords.append(tmp.strip())

    return newWords

num_words = {}

for i in range(0, 10000):
    index = '{0:04}'.format(i)
    word_form = p.number_to_words(i)
    word_form = word_form.replace(",", "")

    if(index[2] == '0' and index[3] == '0'):
        word_form += " zero"

    if(index[1] != '1'):
        word_form = word_form.replace("hundred", "hundreds")

    if(index[0] != '1'):
        word_form = word_form.replace("thousand", "thousands")

    word_form = word_form.replace("forty", "fourty")
    word_list = word_form.split()
    remove_list = ['and']
    tmp = ' '.join([i for i in word_list if i not in remove_list])
    num_words[tmp] = i


for i in range(0, 10):
    # Read the input
    inpt = r.recv().decode("utf-8")
    inpt.strip()
    inpt.replace("\n","")
    formula = createFormula(inpt.splitlines(True)[2])

    firstNumber = num_words[formula[0]]
    secondNumber = num_words[formula[2]]
    thirdNumber = num_words[formula[4]]
    firstOperation = operDict.get(formula[1])
    secondOperation = operDict.get(formula[3])

    evalString = str(firstNumber) + str(firstOperation) + str(secondNumber) + str(secondOperation) + str(thirdNumber)
    output = eval(evalString)
    r.sendline(str("{:.2f}".format(output)))

print(r.recv())
r.close()