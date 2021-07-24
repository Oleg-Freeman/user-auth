import { Context, Next } from 'koa';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { Decoded } from '../../types';

export const access = async (ctx: Context, next: Next) => {
    try {
        const token = <string>ctx.header.token;

        if (!token) {
            console.log('Unauthorized');
            ctx.status = 401;
            ctx.body = {
                message: `Unauthorized`,
            };
            return;
        }

        const decoded = await (<Decoded>jwt.verify(token, config.jwtSecret));
        ctx.state = decoded.id;
        return next();
    } catch (err) {
        console.log('Token validation failed', err);
        ctx.status = err.statusCode || err.status || 400;
        ctx.body = {
            message: 'Token validation failed',
            err: err,
        };
    }
};