import axios from "axios";

export const uploadImage = async (file) => {

    const formData = new FormData();

    formData.append("file", file);
    formData.append(
        "upload_preset",
        "app_music_cover"
    );

    const cloudName = "dthaupxlp";

    const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
    );
    
    return {
        publicId: res.data.public_id,
        url: res.data.secure_url
    };
};

export const uploadMusic = async (file) => {

    const formData = new FormData();

    formData.append("file", file);

    formData.append(
        "upload_preset",
        "app_music"
    );

    const cloudName = "dthaupxlp";

    const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
        formData
    );

    return {
        publicId: res.data.public_id,
        url: res.data.secure_url
    };
};