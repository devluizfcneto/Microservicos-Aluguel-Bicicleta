import { NextFunction, Request, Response } from "express";
import HandleErrors from "../errors/HandleErrors.js";

const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
    HandleErrors.handle(error, req, res, next);
};

export default errorMiddleware;