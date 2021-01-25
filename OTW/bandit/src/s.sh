#!/bin/bash

# Quick shell command to quickly ssh into the desired user for the bandit wargame.
# Dependencies: sshpass
# Usage: ./s.sh <username> <password>
# Example: ./s.sh bandit0 bandit0
sshpass -vp $2 ssh $1@bandit.labs.overthewire.org -p 2220