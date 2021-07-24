// business logic
// calculations
// transform to meet db requirements
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { encription } from '../../config';

export class UserService {
    // constructor() {
    // }
    async registerUser(login: string, password: string, firstName: string, lastName: string) {
        const id = uuid();
        const salt = await bcrypt.genSalt(+encription.bcryptSalt);
        const hashPassword = await bcrypt.hash(password, salt);

        return {
            id,
            login,
            password: hashPassword,
            firstName,
            lastName,
        };
    }
}
