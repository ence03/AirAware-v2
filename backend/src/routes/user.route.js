import express from "express";
import { getAllUsers, editUser } from "../controllers/user.controller.js";
import { isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", isAdmin, getAllUsers);

router.patch("/:id", isAdmin, editUser);

export default router;
