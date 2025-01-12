import React from "react";
import { Image } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const UserDetail= () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};

  if (!user) {
    navigate("/admin/allusers");
    return null;
  }




  return (
    <div>
      <h3>User Profile</h3>
      <small>User ID: {user ? user._id : "Please Login"}</small>
      <br />
      <small>Role: {user ? user.role : "Please Login"}</small>
      <br />
      <br />
      <div className="form-container container">
        <form className="form-section">
        <div className="d-flex justify-content-between gap-3 flex-wrap">
          <div className="media-gallery d-block">
          <h6>Avatar</h6>
            <div className="image-box">
              {user ? (
                <img
                  src={user.avatarImage}
                  alt="Avatar"
                  style={{ width: "100px" }}
                />
              ) : (
                <Image size={24} />
              )}
            </div>
          </div>
          <div className="balance">
          <h6>Wallet Balance</h6>
          <h3>AED 100</h3>
          </div>
          
          </div>
          <hr />
          <div className="form-grid">
            {[{
              id: "firstname", label: "First Name", value: user.firstName || "First Name Not Found"
            }, {
              id: "lastname", label: "Last Name", value: user.lastName || "Last Name Not Found"
            }, {
              id: "email", label: "Email", value: user.email || "Email Not Found"
            }, {
              id: "phone", label: "Phone", value: user.contact || "Phone Not Found"
            }, {
              id: "password", label: "Password", value: user.password || "Password Not Found"
            }, {
              id: "address", label: "Address", value: user.address || "No Address Provided"
            },].map(({ id, label, value}) => (
              <div key={id} className="input-container">
                  <input
                    id={id}
                    value={value}
                    disabled
                  />
                <label htmlFor={id}>{label}</label>
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetail;
