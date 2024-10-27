from io import TextIOWrapper
import os
import json
from pathlib import Path
from argparse import ArgumentParser
from typing import List

# Get our current script directory
current_dir = os.path.dirname(__file__)

# Map our language files from a complete alphabet
files = ["{}.json".format(letter) for letter in  "abcdefghijklmnopqrstuvwxyz"]

def main(output: Path, language: str) -> None:
    print("Assembling dictionary for language {}".format(language))
    
    dictionary = assemble_dictionary(language)
    export_dictionary(dictionary=dictionary, path=output, language=language)

def assemble_dictionary(language: str) -> List:
    """
        Assembles the dictionary based on current language, iterating
        over each language file (a.json, b.json, etc.)
    """
    terms = [];
    for file in files:
        try:
            with open("{}/{}/{}".format(current_dir, language, file)) as f:
                [terms.append(term) for term in json.load(f)]
                print("\tFile {} -> [OK]".format(file))
                
        except FileNotFoundError:
            print("\tFile {} -> [NOT FOUND]".format(file))
            pass
    
    return terms

def export_dictionary(path: Path, language: str, dictionary: List) -> None: 
    """
        Export current dictionary to output path, on format
        card_[language].json
    """
    file_name = "{}/cards_{}.json".format(path, language)    
    content = dict(cards=dictionary)

    with open(file_name, "w") as file:
        json.dump(content, file, indent=4, ensure_ascii=False)

    print("Exported {} file with {} terms, for {} language".format(file_name, len(dictionary), language))
    

if __name__ == '__main__':
    parser = ArgumentParser(description="Language generator")
    
    parser.add_argument('-l','--language', type=str, required=True,
                        help='Language to generate data')
    
    parser.add_argument('-o', '--output', type=Path, required=True,
                        help='Output path to generate json file')  

    args = parser.parse_args()

    main(language=args.language, output=args.output)