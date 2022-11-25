import addRemoveFriend from "../controllers/users/addRemoveFriend.js";
import getUserFriends from "../controllers/users/getUserFriends.js";
import getUser from "../controllers/users/getUser.js";
import verifyToken from "../middleware/verifyToken.js";
import express from "express";

const router = express.Router();

// 🟩🟩🟩 Read Operation 
// routs + middleware + endpoints logical function call

// get only single user info
router.get("/:id", verifyToken, getUser);

// get single user fiends list info...
router.get("/:id/friends", verifyToken, getUserFriends);

// 🟨🟨🟨 Update Operation 
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;