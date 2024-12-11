export const CloudinaryUploader = async (file) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  
  // Validate file type
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Only image files are allowed.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'car_auction');
  
  try {
    const response = await fetch('https://api.cloudinary.com/v1_1/dq5jqnxju/image/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Cloudinary upload failed: ' + response.statusText);
    }

    const data = await response.json();

    if (!data.secure_url) {
      throw new Error('No secure URL returned from Cloudinary.');
    }

    return { publicId: data.public_id, url: data.secure_url };
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};
