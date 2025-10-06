// import multer from "multer"

// let storage = multer.diskStorage({
//     destination:(req, file, cb)=> {
//         cb(null , "./public");
//     },
//     filename:(req, file, cb) => {
//         cb(null , file.originalname)
//     }
    
// });

// let upload = multer({storage});

// export default upload;

import multer from "multer";

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

let upload = multer({ storage });

// Export middleware to handle multiple image fields
export const uploadFields = upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]);

export default upload;
