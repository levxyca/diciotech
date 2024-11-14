#!/bin/sh
FILES=$(git diff --cached --name-only --diff-filter=ACMR | sed 's| |\\ |g')
[ -z "$FILES" ] && exit 0

# Prettify all selected files unless they are json files
echo "$FILES" | grep -v '\.json$' | xargs npx prettier --ignore-unknown --write

# Add back the modified/prettified files to staging
echo "$FILES" | xargs git add

exit 0
