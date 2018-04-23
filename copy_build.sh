#!/bin/bash
npm install
grunt build:release
cp -rf web/* .