#!/usr/bin/env bash

set -e

pom_bin="${1}"

if [ -n "$pom_bin" ]; then
  export POM_BIN="$pom_bin"
fi

$(dirname $0)/help.sh

echo -e '\e[32mall tests passed!\e[0m'