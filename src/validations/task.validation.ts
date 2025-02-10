import Joi from "joi";

export const addTaskSchema = Joi.object({
    name: Joi.string().required().messages({
        "string.base": "Task Name must be a string.",
        "string.empty": "Task Name cannot be empty.",
        "any.required": "Task Name is required.",
    }),
    description: Joi.string().messages({
        "string.base": "Task description must be a string.",
    }),
    priority: Joi.string().required().messages({
        "string.base": "Task priority must be a string.",
        "string.empty": "Task priority cannot be empty.",
        "any.required": "Task priority is required.",
    }),
    due_date: Joi.date().iso().required().messages({
        "date.base": "Task due date must be a valid date.",
        "date.format": "Task due date must be in ISO format (YYYY-MM-DD).",
        "any.required": "Task due date is required."
    }),
});


export const editTaskSchema = Joi.object({
    name: Joi.string().required().messages({
        "string.base": "Name must be a string.",
        "string.empty": "Name cannot be empty.",
        "any.required": "Name is required.",
    }),
    description: Joi.string().messages({
        "string.base": "Task description must be a string.",
    }),
    priority: Joi.string().required().messages({
        "string.base": "Task priority must be a string.",
        "string.empty": "Task priority cannot be empty.",
        "any.required": "Task priority is required.",
    }),
    due_date: Joi.date().iso().required().messages({
        "date.base": "Task due date must be a valid date.",
        "date.format": "Task due date must be in ISO format (YYYY-MM-DD).",
        "any.required": "Task due date is required."
    }),
    profile_image: Joi.string().allow("").allow(null),
});