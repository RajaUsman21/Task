import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import CategoryModel from "./category.js";

const ProductModel = sequelize.define(
  "Product",
  {
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productPrice: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {}
);

ProductModel.belongsToMany(CategoryModel, { through: "categoryProducts" });
CategoryModel.belongsToMany(ProductModel, { through: "categoryProducts" });

export default ProductModel;