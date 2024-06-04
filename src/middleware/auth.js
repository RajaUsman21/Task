import jwt from "jsonwebtoken";
import tokenModel from "../model/auth/token.js";

const AuthenticateMiddleware = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "UnAuthorized" });
  }
  token = token.replace("Bearer ", "");
  try {
      const tokenDB= await tokenModel.findOne({where: {token}})
      if(!tokenDB){
        return res.status(401).json({ message: "UnAuthorized"});
      }

  
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded, "req.body");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "UnAuthorized", error});
  }
};

export default AuthenticateMiddleware
