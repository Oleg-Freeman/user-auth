import Koa from 'koa';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import { config } from './config';
import { sequelize } from './config/db';
import userRouter from './modules/user/user.controller';

const app = new Koa();

// Middlewares
app.use(cors());
app.use(bodyParser());
app.use(json());

// Routes
app.use(userRouter.routes());

// Error handler
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = { code: err.statusCode, message: err.message };
        ctx.app.emit('error', err, ctx);
    }
});

sequelize
    .sync()
    .then(() =>
        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        })
    )
    .catch((err) => console.log(err));
