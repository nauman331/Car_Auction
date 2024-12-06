import React from "react";
import { Upload, Image, Link2 } from "lucide-react";

const MediaUpload = () => (
  <>
    <div className="media-gallery">
      {Array.from({ length: 3 }, (_, i) => (
        <div className="image-box" key={i}>
          <Image size={24} />
        </div>
      ))}
      <div className="image-box upload">
        <Upload size={24} />
        <span>Upload</span>
      </div>
    </div>
    <div className="video-link">
      <Link2 size={20} />
      <input placeholder="Enter YouTube or Vimeo URL" />
    </div>
  </>
);

export default MediaUpload;
