import os
import json
from bs4 import BeautifulSoup
from googletrans import Translator
import time
translator = Translator()

html_file = 'index.html'
with open(html_file, 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f, 'html.parser')

texts_to_translate = set()
for tag in soup.find_all(text=True):
    parent = tag.parent.name
    if parent not in ['script', 'style', 'code', 'pre']:
        text = tag.strip()
        if text and len(text) > 1 and not text.isdigit():
            texts_to_translate.add(text)

texts_list = list(texts_to_translate)
en_dict = {}
es_dict = {}

chunk_size = 50
for i in range(0, len(texts_list), chunk_size):
    chunk = texts_list[i:i+chunk_size]
    try:
        en_res = translator.translate(chunk, src='tr', dest='en')
        es_res = translator.translate(chunk, src='tr', dest='es')
        for j, text in enumerate(chunk):
            en_dict[text] = en_res[j].text
            es_dict[text] = es_res[j].text
        print(f'Translated chunk {i//chunk_size + 1}')
        time.sleep(1)
    except Exception as e:
        print(f'Error translating chunk: {e}')

with open('lang_en.json', 'w', encoding='utf-8') as f:
    json.dump(en_dict, f, ensure_ascii=False, indent=2)
with open('lang_es.json', 'w', encoding='utf-8') as f:
    json.dump(es_dict, f, ensure_ascii=False, indent=2)
print('Done translating.')
