import User from "../../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨
// Retrieve user data at MongoDB 
// 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨

// 🟩🟩🟩 Read Operation | Login User
const login = async (req, res) => {

    try {
        const { email, password : userInputPassword } = req.body;

        // find user info from mongodb database...
        const user = await User.findOne({ email: email });

        // if user not exist...
        if (!user) return res.status(400).json({ msg: "User does not exist. " });

        const isMatch = await bcrypt.compare(userInputPassword, user.password);

        // if password not match...
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

        // token creation with user id...
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        // delete user password from object... | do not send it at frontend...
        // const { password, ...userInfo } = user;
        delete user.password;

        // send token + user info at frontend...
        res.status(200).json({ token, user });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default login;