import { joiValidator } from "../joi.validator.middleware";
import Joi from "joi";

export const adminsValidator = joiValidator(Joi.object({
    name: Joi.string().optional(),
    username: Joi.string().optional(),
    page: Joi.number().integer().greater(0).default(1),
    perPage: Joi.number().integer().greater(0).default(10),
}), "query")
