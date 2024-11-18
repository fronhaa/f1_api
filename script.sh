#!/bin/bash

iniciar() {
    echo
    echo "Selecione uma opção:"
    echo
    echo "1 - Instalar programas"
    echo "2 - Sair"
    echo
}

apt_install() {
    echo
    echo "Atualizando repositórios..."
    echo
    sudo apt update &&

    echo
    echo "Instalando Node.js..."
    echo
    sudo apt install nodejs -y &&

    echo
    echo "Instalando NPM..."
    echo
    sudo apt install npm -y &&

    echo
    echo "Instalando o TypeScript..."
    echo
    sudo npm install typescript --save

    echo
    echo "Instalando PostgreSQL..."
    echo
    sudo apt install postgresql postgresql-contrib -y &&

    echo
    echo "Instalando PM2..."
    echo
    sudo npm install pm2@latest -g &&

    echo
    echo "Instalando Redis..."
    echo
    sudo apt install redis -y &&

    echo
    echo "Inicializando o Redis..."
    echo
    sudo service redis start

    echo
    echo "Instalando Git..."
    echo
    sudo apt install git -y &&

    echo
    echo "Instalando Bun..."
    echo
    sudo npm install -g bun &&

    echo
    echo "Adicionando express Bun..."
    echo
    sudo bun add express

    echo
    echo "copiando o arquivo pg_hba.conf"
    echo
    #sudo scp /home/henderson/pg_hba.conf univates@177.44.248.60:/etc/postgresql/16/main/pg_hba.conf &&

    echo
    echo "Clonando o repositório do GIT..."
    echo
    if [ -d "f1_api" ]; then
        echo "O repositório já foi clonado."
    else
        sudo git clone https://github.com/fronhaa/f1_api
    fi

    echo
    echo "Instalando dependências..."
    echo
    sudo npm install --prefix ./f1_api/

    echo
    echo "Iniciando o PM2 e rodando app.ts..."
    echo
    cd f1_api || exit
    sudo pm2 start "bun run ./f1_api/src/app.ts" --name "api"


    echo
    echo "Instalação concluída!"
    echo
}

iniciar

while read -p "Qual a opção que você deseja: " entrada; do
    if [[ "$entrada" =~ ^[0-9]+$ ]]; then
        if [ "$entrada" -eq 1 ]; then
            echo "Iniciando instalação..."
            apt_install
            break
        elif [ "$entrada" -eq 2 ]; then
            echo "Saindo..."
            exit
        else
            echo "Opção inválida. Tente novamente."
        fi
    else
        echo "Por favor, digite um número válido."
    fi
done
