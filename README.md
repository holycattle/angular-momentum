# Angular Momentum

Web project scaffolding code based on Pyramid, TypeScript, SCSS, Jade, and Ansible.
Batteries included for rapid setup in hackathons.

# Set-up

## Packages required

Be sure to have the following packages installed (these are expected
to be installed in the host platform):

* VirtualBox (http://virtualbox.org)
* Vagrant (http://vagrantup.com)
* NodeJS (http://nodejs.org) (version >= 0.10)
* Git (http://git-scm.com)
* Python 2.7.* (http://python.org)

## Some notes on installing on Ubuntu

NodeJS on Ubuntu is outdated, so you will have to add a repository that
has it. The npm command comes with the latest version of NodeJS in Chris Lea's
repository. To get the latest version of NodeJS, run the commands:

    % sudo apt-get install python-software-properties
    % sudo add-apt-repository ppa:chris-lea/node.js -y
    % sudo apt-get update
    % sudo apt-get install nodejs

Lastly, we need to install the package for the Network File System used by
Vagrant to share files with the virtual machine.

    % sudo apt-get install nfs-kernel-server

After all of that, just follow the rest of the instructions listed under
"General Instructions".

## General Instructions

    % git clone git@github.com:kalibrr/angular-momentum.git
    % cd angular-momentum/
    % vagrant up
    % cd frontend
    % npm install
    % sudo npm install -g broccoli-cli
    % sudo npm install -g broccoli-timepiece

and you're ready to go!

# Directory Structure

This is incomplete, but here's a subset of the directory structure.

    ansible/                   - files used for [Ansible](https://ansible.com/), a system configuration management application
    frontend/                 - the files related to the frontend server
      src/                    - the source files for this application
      build/                  - all of the files in src/ get compiled into here.
      package.json            - a description of this NodeJS application (see http://package.json.nodejitsu.com/)
    backend/                  - the files related to the backend server
      requirements.txt        - the requirements file used by [pip](http://www.pip-installer.org/en/latest/requirements.html)
    README.md                 - this readme file
    Vagrantfile               - the configuration file for [Vagrant](http://www.vagrantup.com/)

# Infrastructure
## [Vagrant](http://www.vagrantup.com/)
Vagrant is a tool that makes setting up and configuring virtual machines easier.

Useful commands are:

    vagrant up                - Boots up the virtual machine and provisions it. Creates it if it doesn't exist yet.
    vagrant ssh               - ssh into the virtual machine
    vagrant provision         - Applies all the things in the puppet file.
    vagrant halt              - Shuts down the virtual machine.
    vagrant reload            - Restarts the virtual machine.
    vagrant destroy           - Destroys a virtual machine completely.
    vagrant status            - Checks to see the status of a virtual machine.
