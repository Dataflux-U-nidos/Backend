// src/application/PsychometricUseCase.ts
import axios from 'axios';
import config from '../../../infrastructure/config';

export class CuestionaryUseCase {
  /** Llama a la Lambda de psicométrico sin parámetros */
  public async execute(): Promise<any> {
    const response = await axios.get(config.lambda.SatisfacionUrl);
    return response.data;
  }
}
