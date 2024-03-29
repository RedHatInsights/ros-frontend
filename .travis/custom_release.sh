#!/bin/bash
set -e
set -x

if [ "${TRAVIS_BRANCH}" = "main" ]
then
    for env in qa
    do
        echo "PUSHING ${env}-beta"
        rm -rf ./dist/.git
        .travis/release.sh "${env}-beta"

        echo "PUSHING ${env}-stable"
        rm -rf ./dist/.git
        .travis/release.sh "${env}-stable"
    done
fi


if [[ "${TRAVIS_BRANCH}" = "prod-beta" || "${TRAVIS_BRANCH}" = "prod-stable" ]]; then
    echo "PUSHING ${TRAVIS_BRANCH}"
    rm -rf ./build/.git
    .travis/release.sh "${TRAVIS_BRANCH}"
fi