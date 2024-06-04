
import SalesModel from "../model/sales/index.js"
import ProductModel from "../model/products/product.js"
import SaleProductModel from "../model/sales/salesProducts.js"
import CategoryModel from "../model/products/category.js"
import sequelize from "./config.js"
import userModel from "../model/user/index.js"


const syncDB= async()=>{
    await sequelize.sync({alter:true,force:false}),

    await CategoryModel.sync({alter:true,force:false})
    await ProductModel.sync({alter:true, force:false}),
    await SalesModel.sync({alter:true,force:false}),
    await SaleProductModel.sync({alter:true, force:false}),
    await userModel.sync({alter:true,force:false})
   
}
export default syncDB