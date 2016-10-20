#!/bin/sh

# sh ./deploy.sh imageName tag containerName
imageName=$1
tag=$2
containerName=$3
image=$imageName:$tag

docker pull $image

if [ "$(docker inspect -f '{{.State.Running}}' $containerName)"=="true" ]
then
  docker stop $containerName
  docker rm $containerName
fi

docker run -d -p 4001:4000 \
-v ~/log:/usr/src/app/log \
--name $containerName $image
