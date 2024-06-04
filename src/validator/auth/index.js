import Joi from "joi";
const authValidator = {
  signin: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      // firstName: Joi.string().required(),
      // lastName: Joi.string().required()
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
export default authValidator;
