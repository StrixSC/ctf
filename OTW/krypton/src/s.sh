#!/bin/bash

# Quick shell command to quickly ssh into the desired user for the bandit wargame.
# Dependencies: sshpass
# Usage: ./s.sh <username> <password>
# Example: ./s.sh krypton1 <password>
sshpass -vp $2 ssh $1@krypton.labs.overthewire.org -p 2231