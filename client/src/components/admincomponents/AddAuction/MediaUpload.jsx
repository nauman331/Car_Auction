import React, { useState } from "react";
import { Upload, Image, Link2 } from "lucide-react";
import { CloudinaryUploader } from "../../../utils/CloudinaryUploader";
import toast from "react-hot-toast";

const MediaUpload = ({  setFormData }) => {
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let arr = [];
      for (let i = 0; i < images.length; i++) {
        const data = await CloudinaryUploader(images[i]);
        arr.push(data.url);
      }
      console.log("Uploaded Image URLs:", arr);
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
        <div className="image-box">
          <Image size={24} />
          <input
            type="file"
            multiple={true}
            onChange={(e) => setImages(Array.from(e.target.files))}
            style={{ display: "none" }}
            id="carimages"
          />
          <label htmlFor="carimages" style={{ cursor: "pointer" }}>
            Select Images
          </label>
        </div>
        <form onSubmit={handleSubmit}>
          <button type="submit" className="image-box upload">
            <Upload size={24} />
            <span>Upload</span>
          </button>
        </form>
      </div>
      <small>Don't forget to upload images using the upload button above.</small>
      <hr />
      <div className="video-link">
        <Link2 size={20} />
        <input
          type="text"
          placeholder="Enter YouTube or Vimeo URL"
        />
      </div>
    </>
  );
};


export default MediaUpload;
