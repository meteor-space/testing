#!/bin/sh

# Configure the system
wget https://raw.github.com/arunoda/travis-ci-meteor-packages/master/Makefile
wget https://raw.github.com/arunoda/travis-ci-meteor-packages/master/start_test.js
wget https://raw.github.com/arunoda/travis-ci-meteor-packages/master/phantom_runner.js

# Install meteor
curl https://install.meteor.com | /bin/sh

# Install mgp (for pre-release package dependencies)
npm install -g mgp
mgp
