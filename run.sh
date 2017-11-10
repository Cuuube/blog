#!/bin/bash

source config.sh
tsc -p server/
gulp css
gulp browserify

node build/run.js