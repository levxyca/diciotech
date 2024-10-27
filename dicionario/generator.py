from io import TextIOWrapper
import os
import json
from pathlib import Path
from argparse import ArgumentParser
from typing import List

alphabet = "abcdefghijklmnopqrstuvwxyz"

current_dir = os.path.dirname(__file__)

def main(output: Path, language: str):
    export_terms_file(output, language, 
        process_language_path(language))

def process_language_path(language):
    terms = [];
    for letter in alphabet:
        file = "{}/{}/{}.json".format(current_dir, language, letter)
        try:
            with open(file) as f:
                [terms.append(term) for term in load_letter_content(f)]
        except:
            pass

    return terms

def load_letter_content(f: TextIOWrapper):
    data = json.load(f)
    return data

def export_terms_file(path: Path, language: str, dictionary: List): 
    file_name = "{}/cards_{}.json".format(path, language)
    content = dict(cards=dictionary)

    with open(file_name, "w") as file:
        json.dump(content, file, indent=4, ensure_ascii=False)
    

if __name__ == '__main__':
    parser = ArgumentParser(description="Language generator")
    parser.add_argument('-l','--language', type=str, required=True,
                        help='Language to generate data')
    parser.add_argument('-o', '--output', type=Path, required=True,
                        help='Output path to generate json file')  

    args = parser.parse_args()

    main(language=args.language, output=args.output)