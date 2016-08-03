#!/bin/sh
rsync -rzv * ryan@aswwu.com:~/atlas
ssh ryan@aswwu.com cp -R atlas /var/www/html/atlas
