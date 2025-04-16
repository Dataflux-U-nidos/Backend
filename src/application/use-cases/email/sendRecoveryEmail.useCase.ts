import axios from 'axios';
import { IUserRepository } from '../../../domain';

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

    const lambdaUrl =
      process.env.LAMBDA_URL ||
      'https://sreiiipsy6eog7adotnk4tbbxm0mkuxi.lambda-url.us-east-2.on.aws/';
    const response = await axios.post(lambdaUrl, payload);

    console.log('SendRecoveryEmailUseCase - 2:', email);
    return response.data;
  }
}
