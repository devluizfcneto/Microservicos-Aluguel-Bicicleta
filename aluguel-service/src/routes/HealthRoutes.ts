import express, { NextFunction, Request, Response } from "express";
import HealthController from "../controllers/HealthController.js";

const router = express.Router();
const healthController = new HealthController();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await healthController.getServerStatus(req, res, next);
    } catch (error) {
        next(error);
    }
});
export default router;