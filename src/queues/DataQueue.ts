import { Queue } from 'bullmq';
import RedisClient from '../config/redis';

class DataQueue {
  private queue?: Queue;

  constructor(private queueName: string = 'data-queue') {
    this.initializeQueue();
  }

  private async initializeQueue(): Promise<void> {
    try {
      // Conecta ao Redis
      await RedisClient.connect();

      // Configura a fila Bull, caso ainda não tenha sido criada
      if (!this.queue) {
        this.queue = new Queue(this.queueName, {
          connection: RedisClient.getConnectionOptions()
        });
        console.log(`Fila Bull '${this.queueName}' criada com sucesso`);
      }
    } catch (error) {
      console.error('Erro ao inicializar a fila:', error);
    }
  }

  // Retorna a instância da fila Bull
  public async getQueue(): Promise<Queue> {
    if (!this.queue) {
      await this.initializeQueue();
      if (!this.queue) {
        throw new Error('Fila não foi inicializada');
      }
    }
    return this.queue;
  }

  // Fecha a conexão e a fila
  public async close(): Promise<void> {
    try {
      if (this.queue) {
        await this.queue.close();
        console.log(`Fila '${this.queueName}' fechada`);
      }
      await RedisClient.disconnect();
    } catch (error) {
      console.error('Erro ao fechar conexões:', error);
    }
  }
}

export default new DataQueue();
