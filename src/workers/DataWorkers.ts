import { Worker, Job } from 'bullmq'; // Certifique-se de importar o Job
import { UsuarioController } from '../controllers/UsuarioController';
import RedisClient from '../config/redis';

export class DataWorker {
  constructor() {
    this.processJobs();
  }

  private async processJobs() {
    try {
      // Criação do worker para processar a fila diretamente
      const worker = new Worker('data-queue', async (job: Job) => {
        const data = job.data;
        const usuarioController: UsuarioController = new UsuarioController();
        
        // Processa os dados
        console.log('Processando job:', data);
        
        await usuarioController.create(data as any);

        console.log('Job processado com sucesso:', data);
      }, {
        connection: RedisClient.getConnectionOptions(),
        //Caso os recursos prmitirem podemos processar mais de um job por vez
        //concurrency: 5
      });

      // Log quando o job é completado
      worker.on('completed', (job: Job) => {
        console.log(`Job ${job.id} completed!`);
      });

      // Log quando o job falha
      worker.on('failed', (job: Job | undefined, error: Error) => {
        if (job) {
          console.error(`Job ${job.id} falhou com erro:`, error);
        } else {
          console.error('Job falhou, mas o job não foi encontrado:', error);
        }
      });

    } catch (error) {
      console.error('Erro ao processar jobs:', error);
    }
  }
}
