import { ApiResponse } from "../../response/api.response";
import { actions, notification_routes } from "../../config/constants";
import { Notification } from "../../utils/notification";
import { NextFunction, Request, Response } from "express";
import { ApiErrorResponse } from "../../response/apiError.response";
import redisClient from "../../config/cache.config";

interface IBody {
    name: string,
    username?: string,
    password: string
}

class AdminController {
    static async getAll(req: Request, res: Response, _next: NextFunction) {
        try {
            const query: { page: number, perPage: number, name?: string, username?: string } = { page: Number(req.query.page), perPage: Number(req.query.perPage) }
            req.query.name && (query.name = String(req.query.name));
            req.query.username && (query.username = String(req.query.username));
            const data: any = await Notification.send(notification_routes.admin, { action: actions.adminGetAll, data: query })
            redisClient.set(req.cacheKey, data);
            res.json(new ApiResponse(data));
        } catch (error: any) {
            res.json(new ApiErrorResponse(error.message))
        }
    }

    static async create(req: Request, res: Response, _next: NextFunction) {
        try {
            const { name, username, password }: IBody = req.body;
            const body = { name, username, password };
            const data = await Notification.send(notification_routes.admin, { action: actions.adminCreate, data: body })
            res.json(new ApiResponse(data));
        } catch (error: any) {
            res.json(new ApiErrorResponse(error.message))
        }
    }

    static async updateInfo(req: Request, res: Response, _next: NextFunction) {
        const { name, password, username }: IBody = req.body;
        const body = { name, password, username };
        const data = await Notification.send(notification_routes.admin, { action: actions.adminUpdate, data: body })

        res.json(new ApiResponse(data));
    }

    static async getOne(req: Request, res: Response, _next: NextFunction): Promise<any> {
        try {
            console.log(req.originalUrl, 'req.originalUrl')
            const { id } = req.params
            const data = await Notification.send(notification_routes.admin, { action: actions.adminGet, data: { id } })
            console.log(data, 'qwedsa')
          
            return res.json(new ApiResponse(data));
        } catch (error: any) {
            if (!res.headersSent) {
               return res.status(500).json(new ApiErrorResponse(error.message));
            }
        }
    }

    static async delete(req: Request, res: Response, _next: NextFunction) {
        try {
            const { id } = req.params
            const data = await Notification.send(notification_routes.admin, { action: actions.adminDelete, data: { id } })

            res.json(new ApiResponse(data));
        } catch (error: any) {
            res.json(new ApiErrorResponse(error.message))
        }
    }
}

export default AdminController