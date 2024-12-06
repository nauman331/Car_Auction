import FormGrid from "./AddBuyNow/FormGrid";

const AddAuctionForm = () => {
  const AuctionFields = [
    {
      id: "auctionTitle",
      label: "Auction Title",
      type: "text",
      placeholder: "Ali Toofan",
    },
    {
      id: "auctionnumber",
      label: "Auction Number",
      type: "text",
      placeholder: "Ali Toofan",
    },
    {
      id: "totalvehicles",
      label: "Total Vehicles",
      type: "text",
      placeholder: "05034........",
    },
    {
      id: "startingdate",
      label: "Starting Date",
      type: "select",
      options: ["Sedan"],
    },
    {
      id: "startingtime",
      label: "Starting Time",
      type: "select",
      options: ["Select Make"],
    },
    {
      id: "location",
      label: "Location",
      type: "select",
      options: ["Select Model"],
    },
  ];

  return (
    <>
      <div className="car-list-top">
        <span>
          <h3>Add New Auction Event</h3>
          <small>Fill the form Auction Details Below</small>
        </span>
      </div>
      <div className="form-container">
        <div className="form-section">
          <FormGrid fields={AuctionFields} />
          <button className="next-button">Upload</button>
        </div>
      </div>
    </>
  );
};

export default AddAuctionForm;
