import express from "express";
import {
  postSensorData,
  getAllSensorData,
  getLatestSensorData,
} from "../controllers/sensorData.controller.js";

const router = express.Router();

router.post("/", postSensorData);

router.get("/", getAllSensorData);

router.get("/latest", getLatestSensorData);

export default router;
