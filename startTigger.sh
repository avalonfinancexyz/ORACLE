#!/bin/bash
while true
do
   echo "update feed"
   npx hardhat run scripts/update-feed.ts
   sleep 120
done