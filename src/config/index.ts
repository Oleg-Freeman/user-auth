import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || '5000',
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiration: process.env.JWT_EXPIRATION,
};
