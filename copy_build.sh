#!/bin/bash
rm -r web
npm install
grunt build:release
mkdir typist
cp -r web/* .
cp -r web/* typist