#!/bin/bash

touch dependencies.txt

_now=$(date +"%m_%d_%Y_%H:%M:%S")

echo "--------------------------------------" >> dependencies.txt
echo "$_now" >> dependencies.txt
echo "--------------------------------------" >> dependencies.txt

cat package.json | grep "\"^" | while read LINE

do
    lib_name=$(echo $LINE | cut -d '"' -f 2)
    actual_version=$(cat node_modules/$lib_name/package.json | grep "\"version\": \"" | cut -d '"' -f 4)
    available_version=$(npm view $lib_name version)
    my_dependency_version=$(echo $LINE | cut -d '"' -f 4 | cut -d '^' -f 2)

    if [ "$my_dependency_version" != "$actual_version" ] || [ "$available_version" != "$actual_version" ]
    then
        echo -n "$lib_name: $my_dependency_version, "
        echo -n "actual: $actual_version, "
        echo "available: $available_version"
    fi

done >> dependencies.txt

