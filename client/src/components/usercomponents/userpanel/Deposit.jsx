import React from "react";
import { Upload, Trash2, Wallet } from "lucide-react";

const Deposit = ({ setDepositAmount, depositAmount, pdf, setPdf, NoInput }) => {
  const handleFileChange = (e) => {
    setPdf(e.target.files[0]);
  };

  return (
    <div className="media-gallery">
      {pdf ? (
        pdf.type === "application/pdf" ? (
          <div className="file-box">
            <a href={URL.createObjectURL(pdf)} target="_blank" rel="noopener noreferrer">
              View PDF
            </a>
            <div className="delete-icon">
              <Trash2 color="white" size={30} onClick={() => setPdf(null)} />
            </div>
          </div>
        ) : (
          <div className="image-box">
            <img
              src={URL.createObjectURL(pdf)}
              alt="Uploaded File"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div className="delete-icon">
              <Trash2 color="white" size={30} onClick={() => setPdf(null)} />
            </div>
          </div>
        )
      ) : (
        <button type="button" className="image-box upload" style={{marginLeft: "2rem"}}>
          <Upload size={24} />
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="fileInput"
          />
          <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
            Upload
          </label>
        </button>
      )}
      {
!NoInput &&
      <div className="video-link">
        <Wallet size={20} />
        <input
          type="number"
          placeholder="Deposited Amount"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />
      </div>
      }
    </div>
  );
};


export default Deposit;
