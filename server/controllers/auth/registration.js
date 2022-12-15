import User from "../../models/User.js";
import bcrypt from "bcrypt";

// 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨
// Save user data at MongoDB 
// 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨

// ✅✅✅ Create Operation | Register User
const registration = async (req, res) => {

    try {
        // these data come from frontend by user input at UI input field...
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;

        // for password protection | Hashing System... | avoid Hashing collection also...
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // creating new user | object data model...
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });

        // save user at mongodb database...
        const savedUser = await newUser.save();

        // send user info at frontend...
        res.status(201).json(savedUser);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default registration;