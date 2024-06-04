import Joi from "joi";
const productValidator = {
  create: (req, res, next) => {
    const schema = Joi.object({
      productName: Joi.string().required(),
      productStock: Joi.string().required()
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
      productName: Joi.string().required(),
      productStock: Joi.string().required()
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
export default productValidator;
