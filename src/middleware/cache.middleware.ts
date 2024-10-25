import { NextFunction, Request, Response } from "express";
import redisCache, { IQuery } from "../config/cache.config";
import { ApiResponse } from "../response/api.response";
import { hash } from "../utils/utils";

export function cacheMiddleware() {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const hashKey = hash(req.originalUrl);
            req.cacheKey = hashKey;

            const isCached = await redisCache.exists(hashKey);
            if (isCached) {
                console.log('Data found in cache');

                const cachedData = await redisCache.get(hashKey);

                if (cachedData) {
                    return res.json(new ApiResponse(cachedData));
                }
            }

            next();
        } catch (error: any) {
            console.error('Error in cache middleware:', error.message);
            next();
        }
    };
}