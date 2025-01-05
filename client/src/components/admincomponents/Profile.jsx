import React, { useState, useEffect } from "react";
import { Image, Upload } from "lucide-react";
import { backendURL } from "../../utils/Exports";
import { useSelector, useDispatch } from "react-redux";
import { CloudinaryUploader } from "../../utils/CloudinaryUploader";
import toast from "react-hot-toast";
import { setUser } from "../../store/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { token, userdata } = useSelector((state) => state.auth);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    address: "",
    description: "",
  });

  const getUserData = async () => {
    const authorizationToken = `Bearer ${token}`;
    try {
      if (!token) {
        toast.error("User not logged in");
        return;
      }
      const response = await fetch(`${backendURL}/user/`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
          "Content-Type": "application/json",
        },
      });
      const res_data = await response.json();
      if (response.ok) {
        dispatch(setUser({ userdata: res_data }));
      } else {
        toast.error(res_data.message || "Error in getting user data");
      }
    } catch (error) {
      toast.error("Error in fetching user data");
    }
  };

  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, [token]);

  useEffect(() => {
    if (userdata) {
      setFormData({
        firstName: userdata.firstName || "",
        lastName: userdata.lastName || "",
        phone: userdata.contact || "",
        password: userdata.password || "",
        address: userdata.address || "",
        description: userdata.description || "",
      });
    }
  }, [userdata]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const authorizationToken = `Bearer ${token}`;
    let avatarImage = userdata?.avatarImage;

    try {
      if (file) {
        avatarImage = await CloudinaryUploader(file);
      }

      const response = await fetch(`${backendURL}/user/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify({ ...formData, avatarImage: avatarImage?.url || userdata.avatarImage }),
      });
      const res_data = await response.json();
      if (!response.ok) {
        toast.error(res_data.message);
      } else {
        toast.success(res_data.message);
        getUserData();
      }
    } catch (error) {
      toast.error("Error while uploading", error);
    }
  };

  return (
    <div>
      <h3>Edit Profile</h3>
      <small>User ID: {userdata ? userdata.id : "Please Login"}</small>
      <br />
      <small>Role: {userdata ? userdata.role : "Please Login"}</small>
      <br />
      <br />
      <div className="form-container container">
        <form onSubmit={handleSubmit} className="form-section">
          <h6>Avatar</h6>
          <div className="media-gallery">
            <div className="image-box">
              {userdata ? (
                <img
                  src={userdata.avatarImage}
                  alt="Avatar"
                  style={{ width: "100px" }}
                />
              ) : (
                <Image size={24} />
              )}
            </div>
            <div className="image-box upload">
              <Upload size={24} />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="fileInput"
              />
              <label htmlFor="fileInput" style={{ cursor: "pointer" }}>Upload</label>
            </div>
          </div>
          <hr />
          <div className="form-grid">
            {[{
              id: "firstname", label: "First Name", value: formData.firstName || "First Name Not Found", name: "firstName"
            }, {
              id: "lastname", label: "Last Name", value: formData.lastName || "Last Name Not Found", name: "lastName"
            }, {
              id: "email", label: "Email", value: userdata?.email || "Email Not Found", type: "email", name: "email",
            }, {
              id: "phone", label: "Phone", value: formData.phone || "Phone Not Found", name: "phone"
            }, {
              id: "password", label: "Password", value: formData.password || "Password Not Found", name: "password", type: "text"
            }, {
              id: "address", label: "Address", value: formData.address || "No Address Provided", name: "address"
            }, {
              id: "description", label: "Description", value: formData.description || "No Description Provided", textarea: true, name: "description"
            }].map(({ id, label, value, type = "text", textarea, name }) => (
              <div key={id} className="input-container">
                {textarea ? (
                  <textarea id={id} value={value} onChange={handleInputChange} name={name}></textarea>
                ) : (
                  <input
                    type={type}
                    id={id}
                    value={value}
                    onChange={handleInputChange}
                    name={name}
                  />
                )}
                <label htmlFor={id}>{label}</label>
              </div>
            ))}
          </div>
          <div className="next-button">
            <button type="submit">Save Profile</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
