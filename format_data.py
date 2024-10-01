import json
from argparse import ArgumentParser
from pathlib import Path
from unicodedata import category, normalize


def strip_accents(s: str) -> str:
    return ''.join(c for c in normalize('NFD', s) if category(c) != 'Mn')


def main(file: Path):
    with open(file) as f:
        data = json.load(f)

    # sort cards by 'title' value
    data['cards'] = sorted(data['cards'], key=lambda x: strip_accents(x['title'].lower()))

    # sort tags inside each card by value
    for card in data['cards']:
        card['tags'] = sorted(card['tags'], key=lambda x: strip_accents(x.lower()))

    # sort keys in the cards by reverse key order
    data['cards'] = [{k: v for k, v in sorted(card.items(), reverse=True)} for card in data['cards']]

    # save data back to the file
    with open(file, 'w') as f:
        json.dump(data, f, indent=2, sort_keys=False, ensure_ascii=False)
        f.write('\n')


if __name__ == '__main__':
    parser = ArgumentParser(description="Sort data.")
    parser.add_argument('-f', '--file', type=Path, required=True,
                        help='Path to the file containing the data')
    args = parser.parse_args()
    main(args.file)
