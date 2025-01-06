#!/bin/bash
# find all staged yml files inside _data/ and its subdirectories
files=$(git diff --name-only --cached | grep -E '_data/.*\.yml$')

if [ -n "$files" ]; then
  # loop through each file and run sort_data.py
  for file in $files; do
    echo "Formatting $file"
    python3 format_data.py -f $file
    git add $file
  done
fi
