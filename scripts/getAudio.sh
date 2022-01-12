#!/bin/bash

SCRIPT_DIR=$(cd $(dirname $0); pwd)
DATA_JSON=${SCRIPT_DIR}/../nuxt/typing_data.json
DIST_DIR=${SCRIPT_DIR}/../nuxt/static/audio

export AWS_PAGER=""

mkdir -p ${DIST_DIR}

for WORD in $(cat ${DATA_JSON} | jq -r ".[].word") ; do
    echo ${WORD}
    aws polly synthesize-speech \
      --output-format mp3 \
      --voice-id Matthew \
      --text "${WORD}" \
      ${DIST_DIR}/${WORD}.mp3
done
