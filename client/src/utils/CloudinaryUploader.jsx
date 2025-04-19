import toast from "react-hot-toast";
import { cloudinaryURL } from "./Exports";

export const CloudinaryUploader = async (file) => {
  // Validate file type: allow all images and PDF
  if (!(file.type.startsWith('image/') || file.type === 'application/pdf')) {
    toast.error('Invalid file type! Only image files and PDFs are allowed.');
    return { url: null };
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'car_auction');

  try {
    const response = await fetch(cloudinaryURL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      toast.error('Cloudinary upload failed. Try again!');
      return { url: null };
    }

    const data = await response.json();

    if (!data.secure_url) {
      toast.error('No secure URL returned from Cloudinary. Try again!');
      return { url: null };
    }

    return {
      publicId: data.public_id,
      url: data.secure_url,
    };
  } catch (error) {
    toast.error('Upload error occurred. Please check your network or file.');
    return { url: null };
  }
};
