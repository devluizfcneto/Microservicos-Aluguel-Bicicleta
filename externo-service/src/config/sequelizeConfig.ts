import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

const {
    POSTGRES_DB_EXTERNO = "externo_db",
    POSTGRES_USER_EXTERNO = "postgres",
    POSTGRES_PASSWORD_EXTERNO = "postgres",
    POSTGRES_HOST_EXTERNO = "localhost",
    POSTGRES_PORT_EXTERNO = "5432",
} = process.env;

if (!POSTGRES_DB_EXTERNO || !POSTGRES_USER_EXTERNO || !POSTGRES_PASSWORD_EXTERNO || !POSTGRES_HOST_EXTERNO) {
    console.warn("Atenção: Uma ou mais variáveis de ambiente do banco de dados não foram definidas. Usando valores padrão.");
}

const sequelize = new Sequelize(POSTGRES_DB_EXTERNO, POSTGRES_USER_EXTERNO, POSTGRES_PASSWORD_EXTERNO, {
    host: POSTGRES_HOST_EXTERNO,
    // logging: (...msg: any) => console.log(msg),
    logging: false,
    port: parseInt(POSTGRES_PORT_EXTERNO, 10),
    dialect: "postgres",
    define: {
        charset: 'utf-8',
        collate: 'utf8_general_ci'
    },
    timezone: "-03:00",
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
});

export default sequelize;