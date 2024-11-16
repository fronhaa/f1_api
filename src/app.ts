import DB from './db';
import server from './server';

//chico aqui
//henderson aqui

async function main(): Promise<void> {
  await DB.initialize();

  server.start();
}

main();
