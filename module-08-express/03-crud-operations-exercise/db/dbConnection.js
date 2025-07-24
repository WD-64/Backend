import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.NEON_URI, { logging: false });

//Optional console log for testing the connection
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default sequelize;
