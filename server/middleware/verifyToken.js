import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {

    try {

        // this header data come from frontend, when user login...
        let token = req.header("Authorization");

        // if no token present...
        if (!token) return res.status(403).send("Access Denied");

        // if have token | extract it from string...
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        // verification of incoming token from frontend...
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // input this [[[verified]]] value, 
        // as [[[res]]] object [[[user]]] property | res.user 
        req.user = verified;

        // allow us to function continue
        next();

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default verifyToken;