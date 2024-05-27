import { Sequelize } from "sequelize";
import 'dotenv/config.js'
const dbName=process.env.DB_NAME
const dbPassword=process.env.DB_PASSWORD
const dbUserName=process.env.DB_USERNAME
const dbHost=process.env.DB_HOST

console.log('Database Name:', dbName);
console.log('Database Password:', dbPassword);
console.log('Database Username:', dbUserName);
console.log('Database Host:', dbHost);
const sequelize= new Sequelize(dbName,dbUserName,dbPassword,{
    host:dbHost,
    dialect:'postgres',
    logging:console.log
})
const dbConnect=async()=>{
    try{
        await sequelize.authenticate();
        console.log("Connection is established succensfully")
    }catch(error){
        console.log("error connecting to database",error)
    }
}

export {dbConnect}
export default sequelize 