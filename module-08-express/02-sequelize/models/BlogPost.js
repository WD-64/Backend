import { DataTypes } from 'sequelize';
import sequelize from '../db/dbConnection.js';

const BlogPost = sequelize.define('BlogPosts', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
});

BlogPost.sync({ alter: true });
//Alter modifies the table if changes were made in the model

export default BlogPost;
