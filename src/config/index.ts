import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || '5000',
    jwtSecret: process.env.JWT_SECRET || 'secret',
    jwtExpiration: process.env.JWT_EXPIRATION,
    bcryptSalt: process.env.BCRYPT_SALT || 10,
};
