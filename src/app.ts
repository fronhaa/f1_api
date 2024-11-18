import DB from './db';
import server from './server';
import { DataWorker } from './workers/DataWorkers';

async function main(): Promise<void> {
  //await DB.initialize();

  new DataWorker();

  server.start();
}

main();