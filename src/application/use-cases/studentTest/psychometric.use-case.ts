// src/application/PsychometricUseCase.ts
import axios from 'axios';
import config from '../../../infrastructure/config';

export class PsychometricUseCase {
  /** Llama a la Lambda de psicométrico sin parámetros */
  public async execute(): Promise<any> {
    const response = await axios.get(config.lambda.psychometricUrl);
    return response.data;
  }
}
