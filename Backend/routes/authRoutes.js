import express from "express";
// import { registerUser } from "../controllers/authcontrol";

import { registerUser, loginUser } from "../controllers/authcontrol.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
