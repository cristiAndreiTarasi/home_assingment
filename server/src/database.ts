import { Sequelize } from "sequelize";

const sqlDb = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
});

export default sqlDb;
