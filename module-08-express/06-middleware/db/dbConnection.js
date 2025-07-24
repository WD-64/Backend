import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.PG_URI, { logging: false });

export default sequelize;
