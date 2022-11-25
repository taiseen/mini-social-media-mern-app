import Post from "../../models/Post.js";
import User from "../../models/User.js";

// ✅✅✅ Create Operation 
const createPost = async (req, res) => {

    try {
        const { userId, description, picturePath } = req.body;

        // get user info from databases
        const user = await User.findById(userId);

        // new Post create...
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: [],
        });
 
        // save new Post at database...
        await newPost.save();

        // get all Posts from database & return to the frontend...
        const post = await Post.find();

        // successfully created | 201
        res.status(201).json(post);
        
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

export default createPost;