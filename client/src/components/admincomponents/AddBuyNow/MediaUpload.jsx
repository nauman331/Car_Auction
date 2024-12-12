import React, { useState } from "react";
import { Upload, Image, Link2 } from "lucide-react";
import { CloudinaryUploader } from "../../../utils/CloudinaryUploader";
import toast from "react-hot-toast";

const MediaUpload = ({ setFormData, formData }) => {
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...selectedFiles]); // Append new images to the existing list

    // Optional: Preview selected images
    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        console.log("Preview Image URL:", reader.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let arr = [];
      for (let i = 0; i < images.length; i++) {
        try {
          const data = await CloudinaryUploader(images[i]);
          arr.push(data.url);
        } catch (uploadError) {
          console.error(`Error uploading file ${images[i].name}:`, uploadError);
        }
      }
      setFormData((prevState) => ({
        ...prevState,
        carImages: arr,
      }));
      toast.success("Images uploaded successfully!");
    } catch (error) {
      toast.error("Error while uploading files");
    }
  };

  return (
    <>
      <div className="media-gallery">

          {images.length > 0 &&
            images.map((image, index) => (
              <div key={index} className="image-box">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`preview-${index}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ))}

        <div className="image-box">
          <Image size={24} />
          <input
            type="file"
            multiple={true}
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="carimages"
          />
          <label htmlFor="carimages" style={{ cursor: "pointer" }}>
            Select Images
          </label>
        </div>
        <button type="button" className="image-box upload" onClick={handleSubmit}>
          <Upload size={24} />
          <span>Upload</span>
        </button>
      </div>
      <small>Don't forget to upload images using the upload button above.</small>
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
  );
};

export default MediaUpload;
