import { createClient, RedisClientType } from 'redis';

class RedisClient {
  private client: RedisClientType;

  constructor(private url: string = 'redis://localhost:6379') {
    this.client = createClient({ url: this.url });
  }

  async connect(): Promise<void> {
    if (!this.client.isOpen) {
      await this.client.connect();
      console.log('Conectado ao Redis com sucesso!');
    }
  }

  async disconnect(): Promise<void> {
    if (this.client.isOpen) {
      await this.client.quit();
      console.log('Conexão com Redis encerrada.');
    }
  }

  getClient(): RedisClientType {
    return this.client;
  }

  // Retorna a configuração de conexão no formato esperado pelo BullMQ
  getConnectionOptions(): { host: string; port: number } {
    const url = new URL(this.url);
    return {
      host: url.hostname,
      port: Number(url.port),
    };
  }
}

export default new RedisClient();
