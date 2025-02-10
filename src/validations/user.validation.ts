import Joi from "joi";

export const registerSchema = Joi.object({
    name: Joi.string().required().messages({
        "string.base": "Name must be a string.",
        "string.empty": "Name cannot be empty.",
        "any.required": "Name is required.",
    }),
    email: Joi.string().email().required().messages({
        "string.base": "Email must be a string.",
        "string.email": "Email must be in valid format.",
        "string.empty": "Email cannot be empty.",
        "any.required": "Email is required.",
    }),
    password: Joi.string().required().messages({
        "string.base": "Password must be a string.",
        "string.empty": "Password cannot be empty.",
        "any.required": "Password is required.",
    }),
    role: Joi.string().required().messages({
        "string.base": "Role must be a string.",
        "string.empty": "Role cannot be empty.",
        "any.required": "Role is required.",
    }),
    profile_image: Joi.string().allow("").allow(null),
});


