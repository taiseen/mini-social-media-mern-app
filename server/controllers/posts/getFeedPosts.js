import Post from "../../models/Post.js";

// 🟩🟩🟩 Read Operation 
const getFeedPosts = async (req, res) => {

    try {
        const allPost = await Post.find();

        // successfully get request | 200
        res.status(200).json(allPost);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export default getFeedPosts;