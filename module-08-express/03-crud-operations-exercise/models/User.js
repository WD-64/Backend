import sequelize from '../db/dbConnection.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define('Users', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
  },
});

User.sync({ alter: true });

export default User;
