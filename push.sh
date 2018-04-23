#!/bin/bash
rev=$(git rev-parse --short HEAD)
git config --global user.email "travis@travis-ci.org"	
git config --global user.name "Travis CI"	
# git clone -b master https://chygoz2:${AUTOBUILD_TOKEN}@github.com/chygoz2/dragonglass master	
# git clone -b prod https://chygoz2:${AUTOBUILD_TOKEN}@github.com/chygoz2/dragonglass prod	
git clone -b master https://github.com/chygoz2/dragonglass master	
git clone -b prod https://github.com/chygoz2/dragonglass prod	
yes | cp -rf master/* prod/
cd prod
git add .	
git commit -m "committed at ${rev} [ci skip]"
git push origin prod
echo -e" Done  "