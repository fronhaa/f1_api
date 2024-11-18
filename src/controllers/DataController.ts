import { Request, Response } from 'express';
import DataQueue from '../queues/DataQueue';
import RedisClient from '../config/redis';

class DataController {
  async insertData(req: Request, res: Response): Promise<void> {
    const data = req.body;
    const dataQueue = await DataQueue.getQueue(); 

    try {

      // Verifica o uso da memória
      const memoryUsage = await RedisClient.getMemoryUsage();
      const memoryLimit = 900 * 1024 * 1024;

      if (memoryUsage >= memoryLimit) {
        console.log('Memória cheia, descartando a requisição.');
        return;
      }

      // Adiciona os dados à fila
      console.log('Adicionando dados à fila...');
      await dataQueue.add('data-job', data);
      console.log('Inserção enfileirada: ', data);

      res.status(201).json({ message: 'Dados inseridos com sucesso!', data });
    } catch (error) {
      console.log('Erro ao inserir os dados:', error);
      res.status(500).json({ message: 'Erro ao inserir os dados', error });
    }
  }
}

export default new DataController();
