import mongoose from "mongoose";

// user | object model for MongoDB
const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 20,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 20,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            max: 50,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        picturePath: {
            type: String,
            default: "",
        },
        friends: {
            type: Array,
            default: [],
        },
        location: String,
        occupation: String,
        impressions: Number,
        viewedProfile: Number,
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;