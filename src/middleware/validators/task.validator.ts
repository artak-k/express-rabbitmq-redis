import { taskType } from "../../config/constants";
import { joiValidator } from "../joi.validator.middleware";
import Joi from "joi";

export const addTaskValidator = joiValidator(Joi.object({
    taskType: Joi.string().valid(...Object.values(taskType)).required(),
    priority: Joi.number().integer().greater(0).default(1),
    content: Joi.object().required(),
}), "body")