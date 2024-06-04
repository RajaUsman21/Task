import Joi from "joi";
const categoryValidator = {
  create: (req, res, next) => {
    const schema = Joi.object({
      Name: Joi.string().required(),
    });
    const { value, error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: "invalid credentials entered", error });
    }

    next();
  },
 
    update: (req, res, next) => {
      const schema = Joi.object({
        Name: Joi.string().required(),
      });
      const { value, error } = schema.validate(req.body);
      if (error) {
        return res
          .status(400)
          .json({ message: "invalid credentials entered", error });
      }
  
      next();
    },
  
};
export default categoryValidator;
