import User from "../../models/User.js";

// 🟨🟨🟨 Update Operation
const addRemoveFriend = async (req, res) => {

    try {
        const { id, friendId } = req.params;

        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            // ⛔ remove friend from friend list...
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            // ✅ add friend at friend list...
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        // save info at mongodb database...
        await user.save();
        await friend.save();

        // multiple api all ==> at database, 
        // thats why we use ==> Promise.all(...)  
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        res.status(200).json(formattedFriends);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export default addRemoveFriend;