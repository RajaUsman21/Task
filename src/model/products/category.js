import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js"; // Ensure this path is correct

const CategoryModel = sequelize.define("Category", {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default CategoryModel;
