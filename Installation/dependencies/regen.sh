#!/bin/bash
pacman -Qm > ./aur.txt
pacman -Qqe > ./pacman.txt
pip list > ./pip.txt
