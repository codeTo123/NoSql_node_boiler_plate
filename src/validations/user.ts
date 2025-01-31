// import Joi from "joi";

// export const addUserSchema = Joi.object({
//   id: Joi.number().optional().allow(),
//   full_name: Joi.string().required().messages({
//     "string.base": "Full name must be a string.",
//     "string.empty": "Full name cannot be empty.",
//     "any.required": "Full name is required.",
//   }),
//   email: Joi.string().email().required().messages({
//     "string.base": "Email must be a string.",
//     "string.empty": "Email cannot be empty.",
//     "any.required": "Email is required.",
//   }),
//   password: Joi.string().required().messages({
//     "string.base": "Password must be a string.",
//     "string.empty": "Password cannot be empty.",
//     "any.required": "Password is required.",
//   }),
//   avatar: Joi.string().allow("").allow(null),
// });

// export const updateUserSchema = Joi.object({
//   id: Joi.number()
//     .strict()
//     .required()
//     .min(1)
//     .messages({
//       "number.base": "Id must be a number.",
//       "number.min": "Id must be greater than zero.",
//       "any.required": "Id is required.",
//       "any.invalid": "Id cannot be null.",
//     })
//     .invalid(null),
 
//   full_name: Joi.string().optional(),
//   avatar: Joi.string().allow("").allow(null)
// });
