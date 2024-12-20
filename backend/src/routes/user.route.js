import express from "express";
import {
  getAllUsers,
  editUser,
  getUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", isAdmin, getAllUsers);

router.patch("/:id", isAdmin, editUser);

router.get("/:id", isAdmin, getUser);

router.delete("/:id", isAdmin, deleteUser);

export default router;
