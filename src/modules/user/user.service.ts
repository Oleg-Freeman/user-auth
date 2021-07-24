import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { config } from '../../config';
import { UserModel } from './user.model';
import { UpdateUser, UserAttributes, UserInterface } from '../../types';

export class UserService {
    private model: UserModel;
    constructor() {
        this.model = new UserModel();
    }

    async registerUser(login: string, password: string, firstName: string, lastName: string): Promise<UserAttributes> {
        const id = uuid();
        const hashPassword = await this.encrypt(password);

        await this.model.insertUser({
            id,
            login,
            password: hashPassword,
            firstName,
            lastName,
        });

        return {
            id,
            login,
            password: hashPassword,
            firstName,
            lastName,
        };
    }

    async loginUser(password: string, savedPassword: string, id: string): Promise<string | undefined> {
        const passwordMatch = bcrypt.compareSync(password, savedPassword);

        if (passwordMatch) {
            return (
                'Bearer ' +
                jwt.sign({ id }, config.jwtSecret, {
                    expiresIn: config.jwtExpiration,
                })
            );
        }
    }

    async ifUserExist(login: string): Promise<UserInterface[] | undefined> {
        return await this.model.queryUserLogin(login);
    }

    async getById(id: string): Promise<UserInterface | null> {
        return await this.model.queryByID(id);
    }

    async getAll(page: number, quantity: number): Promise<UserInterface[] | undefined> {
        return await this.model.getAll(page, quantity);
    }

    async findAndUpdate(id: string, properties: UpdateUser): Promise<void> {
        const newProps = properties;
        if (newProps.password) {
            newProps.password = await this.encrypt(newProps.password);
        }
        const updateProps = [];
        for (const [key, value] of Object.entries(newProps)) {
            updateProps.push(`${key} = "${value}"`);
        }
        await this.model.findAndUpdate(id, updateProps);
    }

    async encrypt(src: string): Promise<string> {
        const salt = await bcrypt.genSalt(+config.bcryptSalt);
        return await bcrypt.hash(src, salt);
    }
}
