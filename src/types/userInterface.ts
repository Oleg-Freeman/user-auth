import {Optional, Model} from 'sequelize'

interface UserAttributes {
    id: string;
    login: string;
    password: string;
    firstName: string;
    lastName: string;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export interface UserInterface extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}
