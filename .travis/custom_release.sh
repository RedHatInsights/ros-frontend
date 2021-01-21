#!/bin/bash
set -e
set -x

if [ "${TRAVIS_BRANCH}" = "main" ]
then
    for env in ci
    do
        echo "PUSHING ${env}-beta & ${env}-stable"
        rm -rf ./dist/.git
        .travis/release.sh "${env}-beta"
        rm -rf ./dist/.git
        .travis/release.sh "${env}-stable"
    done
fi
