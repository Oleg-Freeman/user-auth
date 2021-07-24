import Sequelize from 'sequelize';
import { sequelize } from '../../db';
import { UserInterface } from '../../types';

export const Users = sequelize.define<UserInterface>('Users', {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    login: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});
