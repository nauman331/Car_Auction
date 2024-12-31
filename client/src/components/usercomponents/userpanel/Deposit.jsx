import React from "react";
import { Upload, Trash2, Link2 } from "lucide-react";

const Deposit = ({
  setDepositAmount= () => "", 
   depositAmount = "",         
  pdf = null,          
  setPdf = () => {},  
}) => {
  // Handle new image uploads
  const handleFileChange = (e) => {
    setPdf(e.target.files[0]);
  };


  return (
    <>
      <div className="media-gallery">
            <div className="image-box">
              <img
                src={pdf}
                alt="Transcript"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div className="delete-icon">
                <Trash2
                  color="white"
                  size={30}
                  onClick={() => setPdf(null)}
                />
              </div>
            </div>

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

        <>
          <small>Don't forget to upload images using the upload button above.</small>
          <hr />
          <div className="video-link">
            <Link2 size={20} />
            <input
              type="text"
              placeholder="Enter Amount to Deposit"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value) }
            />
          </div>
        </>
    </>
  );
};

export default Deposit;
