import Joi from 'joi';

const loginSchema = Joi.object().keys({
    login: Joi.string().pattern(new RegExp('^[a-zA-Z0-9-_.@]{3,20}$')).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*.,-_=+]{6,30}$')).required(),
});

const registerSchema = loginSchema.keys({
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
});

export const loginValidation = (body: string | Record<string, unknown>) => {
    const { error: err } = loginSchema.validate(body);
    return err;
};

export const registerValidation = (body: string | Record<string, unknown>) => {
    const { error: err } = registerSchema.validate(body);
    return err;
};
