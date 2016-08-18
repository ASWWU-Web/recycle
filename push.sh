#!/bin/sh
rsync -rzv --delete-after * ryan@aswwu.com:~/atlas
ssh ryan@aswwu.com cp -R atlas /var/www/html/
