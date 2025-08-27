import multer from "multer";

// Use memoryStorage to get the file as a buffer in memory; that is temporarily stored
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type: Only images are allowed."), false);
    }
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 10, // 10mb limit
    },
});
