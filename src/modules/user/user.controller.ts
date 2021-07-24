// handle HTTP request
// input data validation
// response
// error
import Router from 'koa-router';
import { UserService } from './user.service';
import { RegisterRequest } from '../../types/userInterface';
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

        const userService = new UserService();
        const user = await userService.registerUser(login, password, firstName, lastName);

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
// router.post('/api/user/login', async (ctx) => {
//     const {login, password} = <loginRequest><unknown>ctx.request.body;
// })

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
