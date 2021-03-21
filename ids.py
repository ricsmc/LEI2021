import json
import random
val = input("Nome do ficheiro: ") 
ids = []
ids_col = []
ids_mem = []
with open(val + '.json') as json_file:
    data = json.load(json_file)
    for p in data:
        ids.append(p['_id'])

with open('col_input.json') as col_file:
    data_col = json.load(col_file)
    for c in data_col:
        ids_col.append(c['_id'])
        c['utilizador'] = random.choice(ids)
    with open('col_output.json', 'w') as outfile:
        json.dump(data_col, outfile)

with open('mem_input.json') as mem_file:
    data_mem = json.load(mem_file)
    for c in data_mem:
        ids_mem.append(c['_id'])
        c['utilizador'] = random.choice(ids)
        collections = []
        i = 0
        j = random.randint(0,3)
        while i < j:
            item = random.choice(ids_col)
            if item not in collections:
                collections.append(item)
            i = i+1
        c['collections'] = collections
    with open('mem_output.json', 'w') as outfile:
        json.dump(data_mem, outfile)


with open('people_input.json') as people_file:
    data_people = json.load(people_file)
    for c in data_people:
        memories = []
        i = 0
        j = random.randint(0,3)
        while i < j:
            item = random.choice(ids_mem)
            if item not in collections:
                memories.append(item)
            i = i+1
        c['memories'] = memories
    with open('people_output.json', 'w') as outfile:
        json.dump(data_people, outfile)
