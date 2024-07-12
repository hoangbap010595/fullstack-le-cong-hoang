import { DataTypes, Model, Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

export class Todo extends Model {}

// Define User model
Todo.init(
  {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    completed: DataTypes.BOOLEAN,
  },
  { sequelize, modelName: "todo" }
);

const initDatabase = () => {
  sequelize.sync();
};

export default initDatabase;
