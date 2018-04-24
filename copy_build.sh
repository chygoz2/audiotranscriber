#!/bin/bash
rm -r web
rm -r typist
npm install
grunt build:release
mkdir typist
cp -r web/* .
cp -r web/* typist