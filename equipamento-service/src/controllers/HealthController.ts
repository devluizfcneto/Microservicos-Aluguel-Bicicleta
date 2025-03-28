import { NextFunction, Request, Response } from "express";

export default class HealthController {
    public async getServerStatus(req: Request, res: Response, next: NextFunction) {
        return res.json({
            message: "Equipamento-Service executando com sucesso!"
        });
    }
}