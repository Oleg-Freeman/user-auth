import { Context, Next } from 'koa';

export const isOwner = async (ctx: Context, next: Next) => {
    try {
        const tokenID = <string>ctx.state.id;
        const id = <string>ctx.params.id;

        if (tokenID !== id) {
            console.log('Forbidden');
            ctx.status = 403;
            ctx.body = {
                message: `Forbidden`,
            };
            return;
        }
        return next();
    } catch (err) {
        console.log('Owner validation failed', err);
        ctx.status = err.statusCode || err.status || 403;
        ctx.body = {
            message: 'Owner validation failed',
            err: err,
        };
    }
};
