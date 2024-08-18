import MercadoPagoConfig from 'mercadopago';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

export const client = new MercadoPagoConfig({
  accessToken:
    'APP_USR-8334772278648717-073113-0c8af1ed3bd5215d8c5f32f82d27b5eb-1923718057',
});
