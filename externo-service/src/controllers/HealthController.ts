import { NextFunction, Request, Response } from "express";

export default class HealthController {
    public async getServerStatus(req: Request, res: Response, next: NextFunction) {
        return res.json({
            message: "Externo-Service executando com sucesso!"
        });
    }
}