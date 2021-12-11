#!/usr/bin/env bash

set -e -u

set -o pipefail

run() {
  echo -e 'running \e[33m'"$@"$'\e[0m...'
  eval "$@" 2>&1 | sed -e 's/^/  /g'
  echo ""
}

pom() {
  # check if a binary was set via env (e.g. from all.sh)
  local pom_bin
  pom_bin="${POM_BIN:-../pom/pom.sh}"

  "$pom_bin" "$@"
}