import axios from 'axios';
import { IUserRepository } from '../../../domain';
import config from '../../../infrastructure/config';

export class SendRecoveryEmailUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  // This method sends a recovery email to the user if the email exists in the database.
  public async execute(email: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return 'Si el correo existe, recibirás instrucciones';
    }

    // if user exists, send recovery email
    const payload = {
      to: email,
      subject: 'Recuperación de contraseña',
      type: 'PASSWORD_RECOVERY',
    };

    // Call the lambda function to send the email
    const response = await axios.post(config.lambda.lambdaUrl, payload);
    return response.data;
  }
}
