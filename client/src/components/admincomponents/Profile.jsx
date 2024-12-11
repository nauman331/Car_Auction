import React, { useState } from "react";
import { Image, Upload } from "lucide-react";
import {backendURL} from "../../utils/Exports"
import {useSelector} from "react-redux"
import {CloudinaryUploader} from "../../utils/CloudinaryUploader";
import toast from "react-hot-toast"
const Profile = () => {

    const {token, userdata} = useSelector((state)=>state.auth);

  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    address: ""
  })

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    const authorizationToken = `Bearer ${token}`;
    let avatarImage = userdata.avatarImage;
    try {
      if(file){
        const avatarImage = await CloudinaryUploader(file);
        console.log(avatarImage);
      }
      const response = await fetch(`${backendURL}/user/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify({ avatarImage, ...formData }),
      });
  const res_data = await response.json()
      if (!response.ok) {
        toast.error(res_data.message);
      }
  
      toast.success(res_data.message)
    } catch (error) {
      toast.error("Error while Uploading", error);
    }
  };
  

  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
        <h3>Edit Profile</h3>
        <small>User ID: {userdata ? userdata.id: "Please Login"}</small>
        <br />
        <small>Role: {userdata ? userdata.role: "Please Login"}</small>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="form-section">
          <h6>Avatar</h6>
          <div className="media-gallery">
            <div className="image-box">
              {userdata ? (
                <img src={userdata && userdata.avatarImage} alt="Avatar" style={{ width: "100px" }} />
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
              { id: "firstname", label: "First Name", value: userdata ? userdata.firstName: "Please Login", name: "firstName" },
              { id: "lastname", label: "Last Name", value: userdata ? userdata.lastName: "Please Login", name: "lastName" },
              {
                id: "Email",
                label: "Email",
                value: userdata ? userdata.email: "Please Login",
                type: "email",
                name: "email"
              },
              { id: "phone", label: "Phone", value: userdata ? userdata.contact: "Please Login", name: "phone" },
              {
                id: "password",
                label: "Password",
                value: "XX-XXXXX-XX",
                name: "password",
                extra: <button><small>Change Password</small></button>,
              },
              { id: "address", label: "Address", value: "e.g. Linkon Park", name: "address" },
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
                  <input type={type} id={id} defaultValue={value} 
                  onChange={handleInputChange}
                  />
                )}
                <label htmlFor={id}>{label}</label>
                {extra}
              </div>
            ))}
          </div>
          <button className="next-button">Save Profile</button>
        </form>
      </div>
    </>
  );
};

export default Profile;
