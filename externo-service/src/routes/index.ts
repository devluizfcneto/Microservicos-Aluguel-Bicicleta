import express from "express";
import HealthRoutes from "./HealthRoutes.js";

const router = express.Router();
router.use("/health", HealthRoutes);

export default router;
