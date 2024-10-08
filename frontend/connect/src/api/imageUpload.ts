import axios from "axios";

const uploadImage = async (image:File): Promise<any> => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'connect-upload-preset'); 

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dnirajbb5/image/upload',
        formData
      );

      const uploadedImageUrl = response.data.secure_url;
      return uploadedImageUrl;

    } catch (error) {
        console.error('Error uploading the image', error);
        throw new Error('Error uploading the image')
    }
};

export default uploadImage