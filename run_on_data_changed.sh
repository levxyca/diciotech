#!/bin/bash
# find all staged json files inside assets/data/ and its subdirectories
files=$(git diff --name-only --cached | grep -E 'assets/data/.*\.json$')

if [ -n "$files" ]; then
  # loop through each file and run sort_data.py
  for file in $files; do
    echo "Formatting $file"
    python3 format_data.py -f $file
    git add $file
  done
fi
