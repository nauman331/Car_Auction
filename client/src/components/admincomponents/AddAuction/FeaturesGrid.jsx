import React from "react";


const FeaturesGrid = ({ formData, setFormData }) => {
  const features = [
    { title: "Convenience", items: ["Heated Seats", "Heated Steering Wheel", "Navigation System", "Tyre Pressure Monitoring System"] },
    { title: "Entertainment", items: ["Apple CarPlay/Android Auto", "Bluetooth", "Home Link"] },
    { title: "Safety", items: ["Airbag - Driver", "Airbag - Passenger", "Anti-Lock Breaking System", "Backup Camera", "Blind Spot Monitor"] },
    { title: "Interior", items: ["Center Console", "Heated and Ventilated Front Seats", "Panoramic Moonroof", "Qi Wireless Charging", "Touch Screen Display"] },
    { title: "Exterior", items: ["Alloy Wheels", "Brake Calipers - Silver Painted", "Rear Bumper High Gloss", "Rear Diffuser Body Color", "Windows - Electric Front"] },
  ];
  

  const handleFeatureChange = (category, feature) => {
    setFormData((prevData) => ({
      ...prevData,
      features: {
        ...prevData.features,
        [category]: prevData.features[category].includes(feature)
          ? prevData.features[category].filter((f) => f !== feature)
          : [...prevData.features[category], feature],
      },
    }));
  };

  return (
    <div className="feature-grid">
      {features.map((group, idx) => (
        <div key={idx}>
          <h5>{group.title}</h5>
          {group.items.map((item, i) => (
            <label key={i}>
              <input
                type="checkbox"
                checked={formData.features[group.title.toLowerCase()]?.includes(item) || false}
                onChange={() => handleFeatureChange(group.title.toLowerCase(), item)}
              />
              <small>{item}</small>
            </label>
          ))}
        </div>
      ))}
    </div>
  );
};


export default FeaturesGrid;
