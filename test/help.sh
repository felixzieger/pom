#!/usr/bin/env bash

set -e

source $(dirname $0)/helpers.sh

it_can_output_help() {
  pom --help
}

run it_can_output_help