#-*- mode: ruby -*-
# vi: set ft=ruby :

# Find Vagrant root directory
root_dir = Dir.pwd
until Dir.entries(root_dir).include? 'Vagrantfile'
  root_dir = File.expand_path('..', root_dir)
end
Dir.chdir(root_dir)

Vagrant.configure("2") do |config|
  config.vm.box = "phusion/ubuntu-14.04-amd64"
  config.vm.hostname = "abelian-group"
  
  config.vm.provider "virtualbox" do |v|
    v.memory = 4096
  end
  
  config.vm.synced_folder ".", "/home/vagrant/angular-momentum/"
  config.vm.synced_folder ".", "/var/www/angular-momentum/"
  
  config.vm.network :private_network, ip: "172.16.0.41"
  config.vm.network :forwarded_port, guest: 80, host: 8000 # Nginx
  
  config.vm.provision :ansible do |ansible|
    ansible.sudo = true
    ansible.playbook = "ansible/vagrant.yml"
    ansible.inventory_path = "ansible/hosts" # Changed from inventory_path in Vagrant 1.3.x
  end
end
