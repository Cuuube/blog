#!/bin/bash

source config.sh
tsc -p server/
tsc -p client/script/
gulp css
# gulp browserify

node build/run.js