#!/bin/sh

# reference: https://certbot.eff.org/#ubuntuxenial-nginx

letsencrypt certonly --webroot \
-w /var/www/leeching \
-d leeching.space \
-d www.leeching.space \
-d alpha.leeching.space
