#!/bin/sh
# This is a comment!
echo "Downloading rmlmapper-java ..."
DIRECTORY=rmlmapper-java
JAR=/rmlmapper-java.jar
if [ ! -d "$DIRECTORY" ]; then
    mkdir $DIRECTORY
fi

curl -L https://github.com/RMLio/rmlmapper-java/releases/download/v0.2.1/rmlmapper-0.2.1.jar > "$DIRECTORY$JAR"
echo "Download completed"
