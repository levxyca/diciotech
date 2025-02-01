#!/bin/bash
# find all staged yml files inside _data/ and its subdirectories
files=$(git diff --name-only --cached | grep -E '_data/.*\.yml$')

if [ -n "$files" ]; then
  # loop through each file and run sort_data.py
  for file in $files; do
    # skip if the file name is strings.yml
    if [[ $(basename $file) == "strings.yml" ]]; then
      continue
    fi

    echo "Formatting $file"
    python3 format_data.py -f $file
    git add $file
  done
fi
