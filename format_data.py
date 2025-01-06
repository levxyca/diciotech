import yaml
from argparse import ArgumentParser
from pathlib import Path
from unicodedata import category, normalize


def strip_accents(s: str) -> str:
    return ''.join(c for c in normalize('NFD', s) if category(c) != 'Mn')


def main(file: Path):
    with open(file) as f:
        data = yaml.safe_load(f)

    if not data:
        print(f'Warning: the file {file} is empty')
        return

    # sort cards by 'title' value
    try:
        data = sorted(data, key=lambda x: strip_accents(x['title'].lower()))
    except AttributeError:
        cards_without_title = [card['description'] for card in data if card['title'] is None]
        print(f'Warning: the following cards do not have a title: {cards_without_title}')
        raise
    except KeyError:
        cards_without_title = [card['description'] for card in data if 'title' not in card]
        print(f'Warning: the following cards do not have a title: {cards_without_title}')
        raise

    try:
        # sort tags inside each card by value
        for card in data:
            # ensures that only the first letter of the tag is capitalized
            card['tags'] = [tag.capitalize() for tag in card['tags']]
            card['tags'] = sorted(card['tags'], key=lambda x: strip_accents(x.lower()))

            # ensures that the description ends with a period
            if not card['description'].endswith('.'):
                card['description'] += '.'

    except KeyError:
        cards_without_tags = [card['title'] for card in data if 'tags' not in card]
        print(f'Warning: the following cards do not have tags: {cards_without_tags}')
        raise

    # sort keys in the cards by reverse key order
    data = [{k: v for k, v in sorted(card.items(), reverse=True)} for card in data]

    # save data back to the file
    with open(file, 'w') as f:
        yaml.dump(data, f, sort_keys=False, allow_unicode=True)
        f.write('\n')


if __name__ == '__main__':
    parser = ArgumentParser(description='Sort data.')
    parser.add_argument('-f', '--file', type=Path, required=True,
                        help='Path to the file containing the data')
    args = parser.parse_args()
    main(args.file)
