#!/bin/bash
set -e
cd /var/www/angular-momentum/backend
source /var/www/angular-momentum/virtualenv/bin/activate
gunicorn --paste development.ini -b:8000 --chdir .
