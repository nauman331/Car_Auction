import React from "react";
import img1 from "../../assets/images/team.png";
import "../../assets/stylesheets/team.scss";
// Reusable TeamCard Component
const TeamCard = ({ image, name, title }) => (
  <div className="col-lg-3 col-md-6 col-sm-6">
    <div className="team-card">
      <div className="team-profile">
        <img src={image} alt={name} />
      </div>
      <h6>{name}</h6>
      <p>{title}</p>
    </div>
  </div>
);

// Team Data Array
const teamMembers = [
  {
    image: img1,
    name: "Babar Ali",
  },
  {
    image: img1,
    name: "M Umar Barkaat",
  },
  {
    image: img1,
    name: "M Umar Barkaat",
  },
  {
    image: img1,
    name: "M Umar Barkaat",
  },
  {
    image: img1,
    name: "M Umar Barkaat",
  },
  {
    image: img1,
    name: "Farooq Amin",
  },
  {
    image: img1,
    name: "M Umar Barkaat",
  },
  {
    image: img1,
    name: "Agha Ahmed",
  },
  // {
  //   image: img1,
  //   name: "M Umar Barkaat",
  // },
  // {
  //   image: img1,
  //   name: "M Umar Barkaat",
  // },
];

// Main TeamSection Component
const TeamSection = () => (
  <div>
    <div className="team-text">
      <h2>Our Team</h2>
    </div>
    <div className="team-section">
      <div className="row">
        {teamMembers.map((member, index) => (
          <TeamCard
            key={index}
            image={member.image}
            name={member.name}
            title={member.title}
          />
        ))}
      </div>
    </div>
  </div>
);

export default TeamSection;
