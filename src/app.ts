import DB from './db';
import server from './server';
import { DataWorker } from './workers/DataWorkers';

async function main(): Promise<void> {
  await DB.initialize();

  new DataWorker();

  server.start();
}

main();

// Quando fizer git pull na VM dar esse comando pm2 restart api
// sudo vim /etc/postgresql/16/main/pg_hba.conf
// scp ./script.sh univates@177.44.248.6:/home/univates
// ALTER USER postgres PASSWORD 'nova_senha';