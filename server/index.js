import welcomeMessage from "./controllers/welcomeMessage.js";
import mongoDB from "./connection/mongoDB.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";



// * Configurations
const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use("/assets", express.static(path.join(__dirName, "public/assets")));

// * public file accessible...
app.use(express.static('public'));
// app.use('/fav.ico', express.static('public/fav.ico'));

// * Routes With Files
// * routs + middleware + endpoints logical function call
// in the HTTP call this [[[picture]]] property is setting where image is allocated...
// app.post("/auth/registration", upload.single("picture"), registration);
// app.post("/posts", verifyToken, upload.single("picture"), createPost);



// * 🔀🔀🔀 Routs
// 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);



// * 📝📝📝 DB Connection... 
// 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server Start on port :', PORT, '🟩');
    mongoDB();

    // * ADD DATA ONE TIME | if not then its generate ERROR
    // User.insertMany(users);
    // Post.insertMany(posts);
});



// * 🤗🤗🤗 Root Welcome Message... 
// 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨
app.get('/', welcomeMessage);