import userModel from "../model/user/index.js"
import sequelize from "./config.js"

const syncDB= async()=> {
    await userModel.sync({alter:true,force:true});
    // await userModel.sync({alter:true,force:true})

}
export default syncDB