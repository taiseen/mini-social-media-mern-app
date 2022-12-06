import deleteUserPost from './../controllers/posts/deleteUserPost.js';
import getFeedPosts from "../controllers/posts/getFeedPosts.js";
import getUserPosts from "../controllers/posts/getUserPosts.js";
import createPost from "../controllers/posts/createPost.js";
import likePost from "../controllers/posts/likePost.js";
import verifyToken from "../middleware/verifyToken.js";
import upload from "../storage/fileStorage.js";
import express from "express";

const router = express.Router();

// 🟩🟩🟩 Read Operation 
// routs + middleware + endpoints logical function call

// get all post form database
router.get("/", verifyToken, getFeedPosts);

// create post with image uploaded system
router.post("/", verifyToken, upload.single("picture"), createPost);

// only relevant post of the specific user
router.get("/:userId/posts", verifyToken, getUserPosts);

// 🟨🟨🟨 Update Operation 
router.patch("/:id/like", verifyToken, likePost);

// 🟥🟥🟥 Delete Operation
router.delete("/:postId", verifyToken, deleteUserPost);


export default router;