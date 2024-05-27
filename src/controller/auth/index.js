import userModel from "../../model/user/index.js"

const authController = {
    signup: async (req,res)=>{
        try{
            const payload=req.body
            const userCheck= await userModel.findOne({
                where:{
                    email: payload.email
                }
            })
            if (userCheck){
                return res.status(400).json({message:"user already exist in database"})
            }
            const hPassword= await hash(payload.password,10)

            const user= await userModel.create({
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email,
                password: hPassword
            })
            res.json({message:"user is registered successfully"})
        }
        catch (error){
            console.log(error)
            res.status(500).json({message:"internal server error",error})

        }
    },
    signin: async (req, res) => {
        try {
          const payload = req.body;
          const userCheck = await userModel.findOne({
            where: {
              email: payload.email,
            },
          });
          if (!userCheck) {
            return res.status(401).json({
              message: "Invalid credentials",
            });
          }
          const comparePassword = await compare(
            payload.password,
            userCheck.password
          );
          if (!comparePassword) {
            return res.status(401).json({
              message: "Invalid credentials",
            });
          }
    
          const data = {
            id: userCheck.id,
            email: userCheck.email,
            firstName: userCheck.firstName,
          };
    
          const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
            expiresIn: "1h",
          });
    
          res.json({ data, token });
        } catch (err) {
          console.log(err);
          res.status(500).json({
            message: "Internal server error",
          });
        }
      },
    };
    
    export default authController;