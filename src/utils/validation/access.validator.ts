import { Context, Next } from 'koa';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { Decoded } from '../../types';

export const hasAccess = async (ctx: Context, next: Next): Promise<Next | undefined> => {
    try {
        const auth = <string>ctx.header.token;

        if (!auth) {
            console.log('Unauthorized');
            ctx.status = 401;
            ctx.body = {
                message: `Unauthorized`,
            };
            return;
        }

        const token = auth.split(' ');
        const decoded = await (<Decoded>jwt.verify(token[1], config.jwtSecret));
        ctx.state.id = decoded.id;
        return next();
    } catch (err) {
        console.log('Token validation failed', err);
        ctx.status = err.statusCode || err.status || 401;
        ctx.body = {
            message: 'Token validation failed',
            err: err,
        };
    }
};
