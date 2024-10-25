import { Router } from "express";
import asyncHandler from "express-async-handler";
import { auth } from "../../middleware/auth.middleware";
import AdminController from "./admin.controller";
import { cacheMiddleware } from "../../middleware/cache.middleware";
import { adminsValidator } from "../../middleware/validators/admin.validator";

export const adminRouter = Router();

adminRouter.get('/admin', auth(), adminsValidator, cacheMiddleware(), asyncHandler(AdminController.getAll));
adminRouter.post('/admin', auth(), asyncHandler(AdminController.create));
adminRouter.put('/admin', auth(), asyncHandler(AdminController.updateInfo));
adminRouter.get('/admin/:id', auth(), cacheMiddleware(), asyncHandler(AdminController.getOne));
adminRouter.delete('/admin/:id', auth(), asyncHandler(AdminController.delete));

