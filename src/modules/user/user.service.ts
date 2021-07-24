// business logic
// calculations
// transform to meet db requirements
import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';
import {encription} from '../../config';
import {UserModel} from './user.model';

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

    async ifRegistered(login: string) {
        return await this.model.queryUserLogin(login);
    }
}
