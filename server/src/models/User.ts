import { DataTypes, Model, Sequelize } from "sequelize";
import { IUser } from "../utils/IUser";
import sequelize from "../database";

class User extends Model implements IUser {
    public id!: string;
    public fName!: string;
    public lName!: string;
    public email!: string;
    public password!: string;
}

User.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    fName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: "User",
});

export default User;
