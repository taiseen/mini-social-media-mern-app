import User from "../../models/User.js";

// 🟩🟩🟩 Read Operation 
const getUser = async (req, res) => {

    try {
        const { id } = req.params;

        const user = await User.findById(id);
        console.log(user);
        res.status(200).json(user);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export default getUser;