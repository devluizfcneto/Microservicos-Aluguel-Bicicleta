import { NextFunction, Request, Response } from "express";

export default class HandleErrors {

    public static handle(error: any, req: Request, res: Response, next: NextFunction) {
        const code = error?.statusCode || 500;
        res.status(code).json({
            message: error?.message || "Erro interno do servidor",
            timestamp: new Date().toISOString()
        })
    }
}