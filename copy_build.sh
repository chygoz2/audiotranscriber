#!/bin/bash
npm install
grunt build:release
mv -r web/* .