import { DataTypes} from "sequelize"; 
    import sequelize from "../../db/config.js";


const userModel = sequelize.define("User",{
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
        lastName:{
            type:DataTypes.STRING
        },
        email:{
            type:DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password:{
            type:DataTypes.STRING,
        allowNull: false
        }
    
})
export default userModel