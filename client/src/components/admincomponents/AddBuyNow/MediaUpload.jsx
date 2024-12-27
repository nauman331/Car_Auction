import React from "react";
import { Upload, Trash2, Link2 } from "lucide-react";

const MediaUpload = ({ setFormData, formData, images, setImages, existingImages, setExistingImages, sellingType }) => {
  // Handle new image uploads
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...selectedFiles]); // Append new images to the list
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
        {images.length > 0 &&
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
        <button type="button" className="image-box upload">
          <Upload size={24} />
          <input
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

      {/* Optional Video Link Input */}
      {(sellingType === "fixed" || sellingType === "auction") && (
        <>
          <small>Add or Delete all images of car</small>
          <hr />
          <div className="video-link">
            <Link2 size={20} />
            <input
              type="text"
              placeholder="Enter YouTube or Vimeo URL"
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
      )}
    </>
  );
};

export default MediaUpload;
