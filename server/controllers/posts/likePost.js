import Post from "../../models/Post.js";

// 🟨🟨🟨 Update Operation 
const likePost = async (req, res) => {

    try {
        const { id } = req.params;
        const { userId } = req.body;

        // grabbing the post information...
        const post = await Post.findById(id);

        // grabbing the user, like it OR not...
        const isLiked = post.likes.get(userId);

        isLiked
            ? post.likes.delete(userId)     // have like | ⛔ can delete like...
            : post.likes.set(userId, true); // not like  | ✅ can add like...

        // 🟨 updating post like property...
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );

        // & send this updatedPost at the frontend...
        res.status(200).json(updatedPost);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export default likePost;