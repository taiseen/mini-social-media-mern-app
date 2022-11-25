import mongoose from "mongoose";

/* MONGOOSE SETUP */
const mongoDB = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected To MongoDB ==> OK ✅");
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// mongoose.connection.on('disconnected', () => {
//     console.log('[Listener] ==> MongoDB Disconnected... 🟥');
// })

// mongoose.connection.on('connected', () => {
//     console.log('[Listener] ==> MongoDB Connected... ✅');
// })

export default mongoDB;