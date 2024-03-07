import json

def  controllo_duplicati():
    with open('parole.json', 'r') as f:
        words = json.load(f)

    duplicates = set([word for word in words if words.count(word) > 1])
    return duplicates

if(controllo_duplicati()):
    print(controllo_duplicati())
else:
    print("Non ci sono duplicati")