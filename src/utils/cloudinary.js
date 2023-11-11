import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { CLOUDINARY_FOLDER_NAME } from '../constant.js';

/**
 * Configures the Cloudinary SDK with the provided credentials from environment variables.
 */
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Creates a folder on Cloudinary with the specified name.
 *
 * @returns {Promise<Object>} A promise that resolves to the created folder object.
 * @throws {Error} If folder creation fails.
 */
const createCloudinaryFolder = async () => {
    try {
        cloudinary.api.create_folder(CLOUDINARY_FOLDER_NAME);
        console.log("FOLDER CREATED SUCCESSFULLY :: ");
    }
    catch (error) {
        console.error("FOLDER CREATION FAILED :: ", error.message);
        throw error;
    }
}

/**
 * Uploads an image to Cloudinary from the specified local path.
 *
 * @param {string} imagePath - The local path of the image to be uploaded.
 * @returns {Promise<Object|null>} A promise that resolves to the uploaded image object or null if upload fails.
 */
const uploadImage = async (imagePath) => {
    try {
        if (!imagePath) {
            console.log("Image path is required !!!");
            return null;
        }

        // Upload image to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(imagePath, {
            resource_type: "image",
        });

        console.log("IMAGE UPLOADED SUCCESSFULLY :: ", uploadResponse.url);
        return uploadResponse;
    }
    catch (error) {
        console.log("IMAGE UPLOAD FAILED :: ", error);
        throw error;
    }
    finally {
        // Remove the locally saved temporary file regardless of the upload result
        fs.unlinkSync(imagePath);
    }
}

export {
    createCloudinaryFolder,
    uploadImage
};
