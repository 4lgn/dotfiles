#!/bin/sh
sed -i \
         -e 's/#1f1e1d/rgb(0%,0%,0%)/g' \
         -e 's/#c7c6c6/rgb(100%,100%,100%)/g' \
    -e 's/#1f1e1d/rgb(50%,0%,0%)/g' \
     -e 's/#bdbbba/rgb(0%,50%,0%)/g' \
     -e 's/#1f1e1d/rgb(50%,0%,50%)/g' \
     -e 's/#c7c6c6/rgb(0%,0%,50%)/g' \
	$@
