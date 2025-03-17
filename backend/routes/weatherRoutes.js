import express from "express";
import { getWeather } from "../controllers/weatherController.js";

const router = express.Router();
router.route("/:city").get(getWeather);

export default router;
