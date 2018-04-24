#!/bin/bash
rm -r web
npm install
grunt build:release
sudo rm -r typist
mkdir typist
cp -r web/* .
cp -r web/* typist