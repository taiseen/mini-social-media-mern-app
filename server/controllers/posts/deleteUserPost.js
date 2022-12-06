import Post from "../../models/Post.js";

// 🟥🟥🟥 Delete Operation 
const deleteUserPost = async (req, res) => {

    const { postId } = req.params;

    try {
        await Post.findByIdAndRemove(postId);
        res.status(200).json({ message: 'Post Deleted Successfully' });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export default deleteUserPost;