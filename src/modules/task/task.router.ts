import { Router } from "express";
import asyncHandler from "express-async-handler";
import TaskController from "./task.controller";
import { addTaskValidator } from "../../middleware/validators/task.validator";

export const taskRouter = Router();

taskRouter.post('/task', addTaskValidator, asyncHandler(TaskController.add));
