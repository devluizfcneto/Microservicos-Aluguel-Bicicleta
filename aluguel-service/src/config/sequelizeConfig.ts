import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

const {
    POSTGRES_DB_ALUGUEL = "aluguel_db",
    POSTGRES_USER_ALUGUEL = "postgres",
    POSTGRES_PASSWORD_ALUGUEL = "postgres",
    POSTGRES_HOST_ALUGUEL = "localhost",
    POSTGRES_PORT_ALUGUEL = "5432",
} = process.env;

if (!POSTGRES_DB_ALUGUEL || !POSTGRES_USER_ALUGUEL || !POSTGRES_PASSWORD_ALUGUEL || !POSTGRES_HOST_ALUGUEL) {
    console.warn("Atenção: Uma ou mais variáveis de ambiente do banco de dados não foram definidas. Usando valores padrão.");
}

const sequelize = new Sequelize(POSTGRES_DB_ALUGUEL, POSTGRES_USER_ALUGUEL, POSTGRES_PASSWORD_ALUGUEL, {
    host: POSTGRES_HOST_ALUGUEL,
    // logging: (...msg: any) => console.log(msg),
    logging: false,
    port: parseInt(POSTGRES_PORT_ALUGUEL, 10),
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