import registration from "../controllers/auth/registration.js";
import login from "../controllers/auth/login.js";
import upload from "../storage/fileStorage.js";
import express from "express";

const router = express.Router();

// * Routes With Files
// * routs + middleware + endpoints logical function call

// ✅✅✅ Create Operation
router.post("/registration", upload.single("picture"), registration);

// 🟩🟩🟩 Read Operation 
router.post("/login", login);

export default router;