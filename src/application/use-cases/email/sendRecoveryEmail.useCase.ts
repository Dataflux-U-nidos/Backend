import axios from 'axios';
import { IUserRepository } from '../../../domain';
import config from '../../../infrastructure/config';

export class SendRecoveryEmailUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(email: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return 'Si el correo existe, recibirás instrucciones';
    }

    console.log('SendRecoveryEmailUseCase - 1:', email);
    const payload = {
      to: email,
      subject: 'Recuperación de contraseña',
      type: 'PASSWORD_RECOVERY',
    };

    const response = await axios.post(config.lambda.lambdaUrl, payload);

    console.log('SendRecoveryEmailUseCase - 2:', email);
    return response.data;
  }
}
