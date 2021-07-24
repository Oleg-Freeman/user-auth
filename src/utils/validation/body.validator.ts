import Joi, { ValidationError } from 'joi';

const loginSchema = Joi.object().keys({
    login: Joi.string()
        .pattern(/^[a-zA-Z0-9-_.@]{3,20}$/)
        .required(),
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9!@#$%^&*.,-_=+]{6,30}$/)
        .required(),
});

const registerSchema = loginSchema.keys({
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
});

const updateSchema = Joi.object({
    login: Joi.string().pattern(/^[a-zA-Z0-9-_.@]{3,20}$/),
    password: Joi.string().pattern(/^[a-zA-Z0-9!@#$%^&*.,-_=+]{6,30}$/),
    firstName: Joi.string().min(2).max(20),
    lastName: Joi.string().min(2).max(20),
});

export const validate = (body: string | Record<string, unknown>, type: string): ValidationError | null | undefined => {
    switch (type) {
        case 'login': {
            const { error: err } = loginSchema.validate(body);
            return err;
        }
        case 'register': {
            const { error: err } = registerSchema.validate(body);
            return err;
        }
        case 'update': {
            const { error: err } = updateSchema.validate(body);
            return err;
        }
        default: {
            return null;
        }
    }
};
