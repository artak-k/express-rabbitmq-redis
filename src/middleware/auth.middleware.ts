import { PermissionDeniedError } from "../errors";
import { NextFunction, Request, Response } from "express";
import config from '../config/config'
  
export function auth() {
    return async function (req: Request, _res: Response, next: NextFunction) {
        const token = req.header("X-API-TOKEN");

        if (!token || token !== config.TOKEN) {
            return next(new PermissionDeniedError());
        }

        next()
    }
}