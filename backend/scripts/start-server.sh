#!/bin/bash
set -e
cd /var/www/angular-momentum/backend
source /var/www/angular-momentum/virtualenv/bin/activate
exec gunicorn --paste development.ini -b127.0.0.1:8000 --chdir .
