// handle HTTP request
// input data validation
// response
// error
import Router from 'koa-router';
import { UserService } from './user.service';
import { RegisterRequest, LoginRequest } from '../../types/userInterface';
import { registerValidation, loginValidation } from '../../utils/validation/userValidation';

const router = new Router();

// register new user
router.post('/api/user/register', async (ctx) => {
    try {
        const validationErrors = registerValidation(ctx.request.body);
        if (validationErrors) {
            console.log(`Register request validation error:`, validationErrors.details);
            ctx.status = 400;
            ctx.body = {
                message: `Register request validation error: ${validationErrors.details[0].message}`,
            };
            return;
        }

        const { firstName, lastName, login, password } = <RegisterRequest>(<unknown>ctx.request.body);

        const service = new UserService();
        const userExist = await service.ifUserExist(login);

        if (userExist && userExist.length) {
            console.log(`User already registered`);
            ctx.status = 400;
            ctx.body = {
                message: `User already registered`,
            };
            return;
        }

        const user = await service.registerUser(login, password, firstName, lastName);

        ctx.status = 201;
        ctx.body = {
            message: 'Registered successfully',
            user,
        };
    } catch (err) {
        console.log('Registration failed ', err);
        ctx.status = err.statusCode || err.status || 400;
        ctx.body = {
            message: 'Registration failed',
            err: err,
        };
    }
});

// login
router.post('/api/user/login', async (ctx) => {
    try {
        const validationErrors = loginValidation(ctx.request.body);
        if (validationErrors) {
            console.log(`Login request validation error:`, validationErrors.details);
            ctx.status = 400;
            ctx.body = {
                message: `Login request validation error: ${validationErrors.details[0].message}`,
            };
            return;
        }
        const { login, password } = <LoginRequest>(<unknown>ctx.request.body);

        const service = new UserService();
        const userExist = await service.ifUserExist(login);

        if (!userExist || !userExist.length) {
            console.log(`Wrong credentials, try again`);
            ctx.status = 401;
            ctx.body = {
                message: `Wrong credentials, try again`,
            };
            return;
        }

        const { id, password: savedPassword } = userExist[0];

        const newToken = await service.loginUser(password, savedPassword, id);

        if (newToken) {
            ctx.status = 200;
            ctx.body = {
                token: newToken,
                id,
                message: 'Logged in successfully',
            };
        } else {
            console.log('Wrong credentials, try again');
            ctx.status = 401;
            ctx.body = {
                message: `Wrong credentials, try again`,
            };
        }
    } catch (err) {
        console.log('Login failed', err);
        ctx.status = err.statusCode || err.status || 400;
        ctx.body = {
            message: 'Login failed',
            err: err,
        };
    }
});

// get user by ID
// router.get('/api/user/:id', async (ctx) => {
//
// })

// update user profile
// router.patch('/api/user/:id', async (ctx) => {
//
// })

// get all users
// router.get('/api/user', async (ctx) => {
//
// })

export = router;
