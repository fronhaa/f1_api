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
    sudo apt install redis-server -y &&

    echo
    echo "Inicializando o Redis..."
    echo
    sudo service redis-server start

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
    echo "Clonando o repositório do GIT..."
    echo
    if [ -d "f1_api" ]; then
        echo "O repositório já foi clonado."
    else
        sudo git clone https://github.com/fronhaa/f1_api
    fi

    echo
    echo "Substituindo arquivo pg_hba.conf"
    echo
    sudo service postgresql stop
    sudo cp -r /home/univates/f1_api/pg_hba.conf /etc/postgresql/16/main/
    sudo service postgresql start

    echo
    echo "Instalando dependências..."
    echo
    cd f1_api
    sudo npm install

    echo
    echo "Iniciando o PM2 e rodando app.ts..."
    # Apagar processo existente, se houver
    pm2 delete "api" || true

    echo
    pm2 start "/home/univates/f1_api/src/app.ts" --name "api" --interpreter "/home/univates/.bun/bin/bun"
    pm2 save

    # Configurar startup do PM2 apenas se necessário
    if ! pm2 startup | grep -q "sudo"; then
        echo
        echo "Configurando PM2 para iniciar no boot..."
        pm2 startup
    fi

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
