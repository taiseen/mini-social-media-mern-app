import Post from "../../models/Post.js";

// 🟩🟩🟩 Read Operation 
const getUserPosts = async (req, res) => {

    try {
        const { userId } = req.params;

        const userPosts = await Post.find({ userId });

        // successfully get request | 200
        res.status(200).json(userPosts);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export default getUserPosts;