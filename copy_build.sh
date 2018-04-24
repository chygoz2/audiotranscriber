#!/bin/bash
rm -r web
npm install
grunt build:release
cp -r web/* .