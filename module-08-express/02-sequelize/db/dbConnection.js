import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.NEON_URI);

export default sequelize;
