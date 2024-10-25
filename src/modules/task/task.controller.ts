import { ApiResponse } from "../../response/api.response";
import { actions, notification_routes } from "../../config/constants";
import { Notification } from "../../utils/notification";
import { NextFunction, Request, Response } from "express";

class TaskController {
    static async add(req: Request, res: Response, _next: NextFunction): Promise<any> {
     
        const data = await Notification.send(notification_routes.task, { action: actions.taskCreate, data: req.body })

        res.json(new ApiResponse(data));
    }
}

export default TaskController