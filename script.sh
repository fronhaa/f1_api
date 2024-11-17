#!/bin/bash

iniciar(){
    echo
    echo "Selecione uma opção"
    echo
    echo "1 - Instalar programas"
    echo "2 - Sair"
    echo
}

apt_install(){
    echo
    echo "atualizando repositórios: "
    echo
    sudo apt update &&
    echo
    echo "instalanco nodejs " 
    echo
    sudo apt install nodejs -y &&
    echo 
    echo "instalando npm "
    echo
    sudo apt install npm -y &&
    echo 
    echo "instalando postgresql "
    echo
    sudo apt install postgresql postgresql-contrib -y &&
    echo
    echo "instalando pm2" 
    echo
    sudo npm install pm2@latest -g &&
    echo
    echo "instalando git"
    echo
    sudo apt install git &&
    echo 
    echo "Instalando bun "
    echo
    sudo npm install -g bun &&
    echo
    echo "copiando o arquivo pg_hba.conf"
    echo
 #   sudo scp /home/henderson/pg_hba.conf univates@177.44.248.60:/etc/postgresql/16/main/pg_hba.conf &&
    echo

    iniciar  
}

iniciar
while read -p "Qual a opção que você deseja: " entrada
do

    if [ $entrada -eq 1 ]; then
        echo "Iniciando: "
        apt_install
        break
    elif [ $entrada -eq 2 ]; then
        echo "see you! "
        exit
    fi
done

