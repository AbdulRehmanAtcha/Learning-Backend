import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const CloudinaryUploader = async (imgPath) => {
    try {
        if (!imgPath) return null
        const response = await cloudinary.uploader.upload(imgPath, {
            resource_type: "image",
            folder:"Learning backend"
        })
        fs.unlinkSync(imgPath)
        return response
    } catch (error) {
        fs.unlinkSync(imgPath)
        return null
    }
}



export { CloudinaryUploader }