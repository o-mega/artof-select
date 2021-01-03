# /bin/bash

CNT=$(git status | grep -E "\.(ts|tsx)$" | wc -l)
if [[ $CNT -gt 0 ]]; then
  tsc --noEmit && lint-staged && CI=true yarn test --bail --silent
else
  exit 0
fi
