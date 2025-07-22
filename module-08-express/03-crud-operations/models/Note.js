import sequelize from '../db/dbConnection.js';
import { DataTypes } from 'sequelize';
import User from './User.js';

const Note = sequelize.define('Notes', {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

//Define Relationship / associations
//This is a one to many relationship
User.hasMany(Note);
Note.belongsTo(User);

Note.sync({ alter: true });

export default Note;
