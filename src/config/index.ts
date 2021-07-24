import * as dotenv from 'dotenv';

dotenv.config();

export const server = {
    port: process.env.PORT || '5000',
};

export const token = {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiration: process.env.JWT_EXPIRATION,
};

export const encription = {
    bcryptSalt: process.env.BCRYPT_SALT || 10,
};
