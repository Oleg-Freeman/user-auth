// data access layer
// methods for data access
import { UserAttributes } from '../../types/userInterface';
import { Users } from './user.entity';

export class UserModel {
    private entity: typeof Users;
    constructor() {
        this.entity = Users;
    }
    async insertUser({ id, login, password, lastName, firstName }: UserAttributes) {
        await this.entity.create({
            id,
            login,
            password,
            firstName,
            lastName,
        });
    }
}
