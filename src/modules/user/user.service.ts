// business logic
// calculations
// transform to meet db requirements
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { encription, token } from '../../config';
import { UserModel } from './user.model';
import { UserInterface } from '../../types/userInterface';

export class UserService {
    private model: UserModel;
    constructor() {
        this.model = new UserModel();
    }
    async registerUser(login: string, password: string, firstName: string, lastName: string) {
        const id = uuid();
        const salt = await bcrypt.genSalt(+encription.bcryptSalt);
        const hashPassword = await bcrypt.hash(password, salt);

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

    async loginUser(password: string, savedPassword: string, id: string) {
        const passwordMatch = bcrypt.compareSync(password, savedPassword);

        if (passwordMatch) {
            return jwt.sign({ id }, token.jwtSecret || 'secret', {
                expiresIn: token.jwtExpiration,
            });
        }
    }

    async ifUserExist(login: string): Promise<UserInterface[] | undefined> {
        return await this.model.queryUserLogin(login);
    }

    async getById(id: string) {
        return await this.model.queryByID(id);
    }
}
