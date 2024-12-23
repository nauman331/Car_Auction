import React, { useState, useEffect } from "react";
import { Image, Upload } from "lucide-react";
import { backendURL } from "../../utils/Exports";
import { useDispatch, useSelector } from "react-redux";
import { CloudinaryUploader } from "../../utils/CloudinaryUploader";
import toast from "react-hot-toast";
import { setUser } from "../../store/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { token, userdata } = useSelector((state) => state.auth);

  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    firstName: userdata?.firstName || "",
    lastName: userdata?.lastName || "",
    phone: userdata?.contact || "",
    password: userdata?.password || "",
    address: userdata?.address || "",
    description: userdata?.description || "",
  });

  useEffect(() => {
    // Update form data with existing userdata when it changes
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

  const handleFileChange = async (event) => {
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
        console.log(avatarImage);
      }

      const response = await fetch(`${backendURL}/user/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify({ ...formData, avatarImage: avatarImage?.url }),
      });
      const res_data = await response.json();
      if (!response.ok) {
        toast.error(res_data.message);
      } else {
        toast.success(res_data.message);
        dispatch(setUser({ userdata: res_data }));
      }
    } catch (error) {
      toast.error("Error while uploading", error);
    }
  };

  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
        <h3>Edit Profile</h3>
        <small>User ID: {userdata ? userdata.id : "Please Login"}</small>
        <br />
        <small>Role: {userdata ? userdata.role : "Please Login"}</small>
      </div>

      <div className="form-container">
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
              <span>Upload</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="fileInput"
              />
            </div>
          </div>
          <hr />
          <div className="form-grid">
            {[
              {
                id: "firstname",
                label: "First Name",
                value: formData.firstName,
                name: "firstName",
              },
              {
                id: "lastname",
                label: "Last Name",
                value: formData.lastName,
                name: "lastName",
              },
              {
                id: "email",
                label: "Email",
                value: userdata?.email || "Email Not Set",
                type: "email",
                name: "email",
                disabled: true,
              },
              {
                id: "phone",
                label: "Phone",
                value: formData.phone,
                name: "phone",
              },
              {
                id: "password",
                label: "Password",
                value: formData.password,
                name: "password",
                type: "password",
              },
              {
                id: "address",
                label: "Address",
                value: formData.address,
                name: "address",
              },
              {
                id: "description",
                label: "Description",
                name: "description",
                value: formData.description || "No Description Provided",
                textarea: true,
              },
            ].map(({ id, label, value, type = "text", textarea, name }) => (
              <div key={id} className="input-container">
                {textarea ? (
                  <textarea
                    id={id}
                    value={value}
                    onChange={handleInputChange}
                    name={name}
                  ></textarea>
                ) : (
                  <input
                    type={type}
                    id={id}
                    value={value}
                    onChange={handleInputChange}
                    name={name}
                    disabled={name === "email"} // Disable email field for editing
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
    </>
  );
};

export default Profile;
