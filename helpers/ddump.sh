#!/usr/bin/env bash

[[ -z "$1" ]] && exit 1
android_tools="$(mktemp tgbotXXX -d --tmpdir=/home/$USER)"
git clone -q https://github.com/ShivamKumarJha/android_tools.git "$android_tools" --depth 1
export DUMMYDT=y
export DUMPYARA=y
export VERBOSE=n

mkdir -p "$android_tools/input"
cd "$android_tools/input"

OTA_LINES=`cat $1`
for OTA_LINK in $OTA_LINES; do
    ((OTA_NO++))
    echo "Downloading OTA Number $OTA_NO"
    aria2c -q -s 16 -x 16 ${OTA_LINK} -d "$android_tools/input" -o ${OTA_NO} || { echo "Download failed!"; rm -rf "$android_tools/"; exit 1; }
done

OTA_LIST=($(find $android_tools/input -type f -printf "$android_tools/input/%P\n" | sort -uf))
bash "$android_tools/tools/deltaota.sh" "${OTA_LIST[@]}"
