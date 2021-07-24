import { Optional, Model } from 'sequelize';
import {JwtPayload} from 'jsonwebtoken'

export interface LoginRequest {
    login: string;
    password: string;
}

export interface RegisterRequest extends LoginRequest {
    firstName: string;
    lastName: string;
}

export interface UserAttributes extends RegisterRequest {
    id: string;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export interface UserInterface extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

export interface Decoded extends JwtPayload {
    id: string
}
