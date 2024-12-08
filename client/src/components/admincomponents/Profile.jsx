import React, { useState } from "react";
import { Image, Upload } from "lucide-react";
import {backendURL} from "../../utils/Exports"
import {useSelector} from "react-redux"

const Profile = () => {

    const token = useSelector((state)=>state.auth.token);
    const userdata = useSelector((state)=>state.auth.userdata);

  const [imageUrl, setImageUrl] = useState(""); // For storing the uploaded image URL
  const [file, setFile] = useState(null); // For storing the selected file

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      // Automatically upload the image when a file is selected
      await uploadImageToCloudinary(selectedFile);
    }
  };

  const uploadImageToCloudinary = async (selectedFile) => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "car_auction");
  
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dq5jqnxju/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to upload image to Cloudinary: ${errorData.error.message}`);
      }
  
      const data = await response.json();
      const uploadedImageUrl = data.secure_url;
      setImageUrl(uploadedImageUrl);
      console.log("Image uploaded to Cloudinary:", uploadedImageUrl);

      await imageUrl && sendUrlToBackend(uploadedImageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  

  const sendUrlToBackend = async (imageUrl) => {
    const authorizationToken = `Bearer ${token}`
    try {
      const response = await fetch(`${backendURL}/user/`, {
        // Replace with your backend API endpoint
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify({ avatarImage: imageUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to send image URL to backend");
      }

      alert("Image URL sent to backend successfully!");
    } catch (error) {
      console.error("Error sending image URL to backend:", error);
    }
  };

  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
        <h3>Edit Profile</h3>
        <small>User ID: 2347833894</small>
        <br />
        <small>Role: Admin</small>
      </div>

      <div className="form-container">
        <div className="form-section">
          <h6>Avatar</h6>
          <div className="media-gallery">
            <div className="image-box">
              {userdata ? (
                <img src={userdata.avatarImage} alt="Avatar" style={{ width: "100px" }} />
              ) : (
                <Image size={24} />
              )}
            </div>
            <div className="image-box upload">
              <Upload size={24} />
              <span>Upload</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="fileInput"
              />
              <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
                Select Image
              </label>
            </div>
          </div>
          <hr />
          <div className="form-grid">
            {[
              { id: "firstname", label: "First Name", value: "Ali" },
              { id: "lastname", label: "Last Name", value: "Tufan" },
              {
                id: "Email",
                label: "Email",
                value: "example@example.com",
                type: "email",
              },
              { id: "phone", label: "Phone", value: "+77" },
              {
                id: "password",
                label: "Password",
                value: "XX-XXXXX-XX",
                extra: <button>Change Password</button>,
              },
              { id: "address", label: "Address", value: "e.g. Linkon Park" },
              {
                id: "description",
                label: "Description",
                value: "Lorem Ipsum Dolor Sit",
                textarea: true,
              },
            ].map(({ id, label, value, type = "text", textarea, extra }) => (
              <div key={id} className="input-container">
                {textarea ? (
                  <textarea id={id} defaultValue={value} />
                ) : (
                  <input type={type} id={id} defaultValue={value} />
                )}
                <label htmlFor={id}>{label}</label>
                {extra}
              </div>
            ))}
          </div>
          <button className="next-button">Save Profile</button>
        </div>
      </div>
    </>
  );
};

export default Profile;
