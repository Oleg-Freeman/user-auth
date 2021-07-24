// data access layer
// methods for data access
import { UserAttributes, UserInterface } from '../../types/userInterface';
import { Users } from './user.entity';
import { QueryTypes } from 'sequelize';

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

    async queryUserLogin(login: string): Promise<UserInterface[] | undefined> {
        return await this.entity.sequelize?.query(`SELECT * FROM users WHERE users.login = "${login}"`, {
            type: QueryTypes.SELECT,
        });
    }

    async queryByID(id: string) {
        return await this.entity.findByPk(id);
    }
}
