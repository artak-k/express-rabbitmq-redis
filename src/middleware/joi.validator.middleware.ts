import asyncHandler from "express-async-handler";
import { ArraySchema, ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../errors";

type TargetType = {
  body: "string";
  query: "string"
};

export function joiValidator(schema: ObjectSchema | ArraySchema, target: keyof TargetType = "body") {
  return asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
    const { error, value } = schema.validate(req[target]);
    if (error) {
      res.json(new ValidationError(error.details[0].message).toJSON());
      return;
    } else {

      req[target] = value;
      next();
    }
  });
}