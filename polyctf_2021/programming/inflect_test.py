import inflect
p = inflect.engine()
word_to_number_mapping = {}
for i in range(0, 1000):
    index = '{0:04}'.format(i)
    word_form = p.number_to_words(i)
    word_form = word_form.replace(",", "")

    if(index[2] == '1' and index[3] == '0'): 
        word_form += " ten"

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
    word_to_number_mapping[tmp] = i

print(word_to_number_mapping)