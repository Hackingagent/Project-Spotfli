import React, {useState, useEffect} from "react";
// import service1 from "../../assets/service images/service1.jpg";
import styles from "./ManageService.module.css";

const ManageService = ({ onEdit, onDelete }) => {
  const [isLoading, setIsLoading] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const toggle = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <div className="hoteldash-rooms-header">
        <h1>Manage Offers</h1>
        <button
          className="btn btn-primary"
          onClick={toggle}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "+ Post New Offers"}
        </button>
      </div>
      <div className="hoteldash-room-card">
        <button onClick={onEdit}>Edit</button>
        <button className="delete-btn" onClick={onDelete}>
          Delete
        </button>
      </div>
    </>
  );
};

export default ManageService;
