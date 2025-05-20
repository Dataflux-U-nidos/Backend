import axios from 'axios';
import { IUserRepository } from '../../../domain';
import config from '../../../infrastructure/config';

export class SendCuestionaryEmailUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(email: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return 'Si el correo existe, se enviará el cuestionario';
    }

    const payload = {
      to: email,
      subject: 'Cuestionario de satisfacción',
      type: 'RATE_US',
    };

    const response = await axios.post(config.lambda.lambdaUrl, payload);
    return response.data;
  }
}
