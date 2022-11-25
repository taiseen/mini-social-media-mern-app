import multer from "multer";

/* FILE STORAGE */
const storage = multer.diskStorage({

    destination: function (req, file, callBack) {
        callBack(null, "public/assets");
    },

    filename: function (req, file, callBack) {
        callBack(null, file.originalname);
    },
});

const upload = multer({ storage });

export default  upload;