import User from "../../models/User.js";

// 🟩🟩🟩 Read Operation 
const getUserFriends = async (req, res) => {

    try {
        const { id } = req.params;
        console.log(id)

        const user = await User.findById(id);

        // multiple api all ==> at database, 
        // thats why we use ==> Promise.all(...)  
        const friends = await Promise.all(
            user.friends.map(id => User.findById(id))
        );

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
            console.log(formattedFriends)
        res.status(200).json(formattedFriends);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export default getUserFriends;