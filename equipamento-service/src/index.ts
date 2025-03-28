import express from "express";
import sequelize from "./config/sequelizeConfig.js";
import routes from "./routes/index.js";
import dotenv from "dotenv"
import errorMiddleware from "./middlewares/errorMiddleware.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

app.use(errorMiddleware);

const PORT = process.env.PORT_EQUIPAMENTO;

app.listen(PORT, async () => {
    console.log("[Equipamento-Service] Variaveis de Ambiente:", process.env);
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Conexão com banco de dados estabelecida com sucesso.");
    console.log(`Equipamento-Service server rodando na porta ${PORT}`);
});