import express from "express";
import {
  createAverage,
  getAllAverage,
} from "../controllers/average.controller.js";

const router = express.Router();

router.post("/", createAverage);

router.get("/", getAllAverage);

export default router;
