import React from "react";
import { Upload, Trash2, Link2 } from "lucide-react";

const MediaUpload = ({
  setFormData = () => { }, // Default to a no-op function
  formData = {},         // Default to an empty object
  images = [],           // Default to an empty array
  setImages = () => { },  // Default to a no-op function
  existingImages = [],   // Default to an empty array
  setExistingImages = () => { }, // Default to a no-op function
}) => {
  // Handle new image uploads
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []); // Ensure `e.target.files` is always handled safely
    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  // Delete a new image (not uploaded yet)
  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  // Delete an existing image (already uploaded)
  const handleDeleteExistingImage = (index) => {
    const updatedExistingImages = existingImages.filter((_, i) => i !== index);
    setExistingImages(updatedExistingImages);
  };

  return (
    <>
      <div className="media-gallery">
        {/* Display existing images */}
        {existingImages?.length > 0 &&
          existingImages.map((imageUrl, index) => (
            <div key={`existing-${index}`} className="image-box">
              <img
                src={imageUrl}
                alt={`existing-${index}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div className="delete-icon">
                <Trash2
                  color="white"
                  size={30}
                  onClick={() => handleDeleteExistingImage(index)}
                />
              </div>
            </div>
          ))}

        {/* Display newly uploaded images */}
        {images?.length > 0 &&
          images.map((image, index) => (
            <div key={`new-${index}`} className="image-box">
              <img
                src={URL.createObjectURL(image)}
                alt={`new-preview-${index}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div className="delete-icon">
                <Trash2
                  color="white"
                  size={30}
                  onClick={() => handleDeleteImage(index)}
                />
              </div>
            </div>
          ))}

        {/* Upload button */}
        <button type="button" className="image-box upload" style={{backgroundColor: "#405FF2"}}>
          <Upload size={24} />
          <input
            accept="image/*"
            type="file"
            multiple
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="carimages"
          />
          <label htmlFor="carimages" style={{ cursor: "pointer" }}>
            Upload
          </label>
        </button>
      </div>

      <>
        <small>Don't forget to upload images using the upload button above.</small>
        <hr />
        <div className="video-link">
          <Link2 size={20} />
          <input
            type="text"
            placeholder="Enter YouTube Video URL"
            value={formData.videoLink || ""}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                videoLink: e.target.value,
              }))
            }
          />
        </div>
      </>
    </>
  );
};

export default MediaUpload;
