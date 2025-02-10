import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email":"Email must be a valid formate.",
    "string.base": "Email must be a string.",
    "string.empty": "Email cannot be empty.",
    "any.required": "Email is required.",
  }),
  password: Joi.string().required().messages({
    "string.base": "Password must be a string.",
    "string.empty": "Password cannot be empty.",
    "any.required": "Password is required.",
  })
});