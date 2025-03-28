import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

const {
    POSTGRES_DB_EQUIPAMENTO = "equipamento_db",
    POSTGRES_USER_EQUIPAMENTO = "postgres",
    POSTGRES_PASSWORD_EQUIPAMENTO = "postgres",
    POSTGRES_HOST_EQUIPAMENTO = "localhost",
    POSTGRES_PORT_EQUIPAMENTO = "5432",
} = process.env;

if (!POSTGRES_DB_EQUIPAMENTO || !POSTGRES_USER_EQUIPAMENTO || !POSTGRES_PASSWORD_EQUIPAMENTO || !POSTGRES_HOST_EQUIPAMENTO) {
    console.warn("Atenção: Uma ou mais variáveis de ambiente do banco de dados não foram definidas. Usando valores padrão.");
}

const sequelize = new Sequelize(POSTGRES_DB_EQUIPAMENTO, POSTGRES_USER_EQUIPAMENTO, POSTGRES_PASSWORD_EQUIPAMENTO, {
    host: POSTGRES_HOST_EQUIPAMENTO,
    // logging: (...msg: any) => console.log(msg),
    logging: false,
    dialect: "postgres",
    port: parseInt(POSTGRES_PORT_EQUIPAMENTO, 10),
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