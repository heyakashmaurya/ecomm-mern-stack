// import { v2 as cloudinary } from 'cloudinary'
// import fs from "fs"

// const uploadCloudinary = async (filePath) => {
//     // Configuration
//     cloudinary.config({ 
//         cloud_name: process.env.CLOUD_NAME, 
//         api_key: process.env.API_KEY, 
//         api_secret: process.env.API_SECRET // Click 'View API Keys' above to copy your API secret
//     });

//     try {

//         if(!filePath) {
//         return null
//         }

//     // Upload an image
//      const uploadResult = await cloudinary.uploader
//        .upload(filePath)
//        fs.unlinkSync(filePath)
//        return uploadResult.secure_url

//     } catch (error) {
//         fs.unlinkSync(filePath)
//         console.log(error)
//     }
// }


// import { v2 as cloudinary } from 'cloudinary'
// import fs from "fs"

// // Configuration (only run once at top-level)


// const uploadOnCloudinary = async (filePath) => {
//     cloudinary.config({ 
//     cloud_name: process.env.CLOUD_NAME, 
//     api_key: process.env.API_KEY, 
//     api_secret: process.env.API_SECRET
// });
//     try {
//         if (!filePath) {
//             return null;
//         }

//         // Upload with optimization and optional transformation
//         const uploadResult = await cloudinary.uploader.upload(filePath, {
//             // Optimization options
//             fetch_format: 'auto',
//             quality: 'auto',     
//         });

//         // Delete the local file after upload
//         fs.unlinkSync(filePath);

//         // Return the optimized image URL
//         return uploadResult.secure_url;

//     } catch (error) {
//         // Delete file if error occurs
//         if (fs.existsSync(filePath)) {
//             fs.unlinkSync(filePath);
//         }
//         console.log("Cloudinary Upload Error:", error);
//         return null;
//     }
// };

// export default uploadOnCloudinary;


import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import dotenv from "dotenv"
dotenv.config()

// configure once at the top (not inside the function)
cloudinary.config({ 
    cloud_name:process.env.CLOUD_NAME, 
    api_key:process.env.API_KEY, 
    api_secret:process.env.API_SECRET
});


console.log("Cloudinary ENV check:", {
  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET ? "LOADED" : "MISSING"
});

const uploadOnCloudinary = async (filePath) => {
    cloudinary.config({ 
    cloud_name:process.env.CLOUD_NAME, 
    api_key:process.env.API_KEY, 
    api_secret:process.env.API_SECRET
});
    try {
        if (!filePath) {
            return null;
        }

        // Upload with optimization
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            fetch_format: 'auto',
            quality: 'auto',
        });

        // Safe delete
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        return uploadResult.secure_url;

    } catch (error) {
        // Safe delete on error
        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        console.error("Cloudinary Upload Error:", error?.message || error);
        return null;
    }
};

export default uploadOnCloudinary;
