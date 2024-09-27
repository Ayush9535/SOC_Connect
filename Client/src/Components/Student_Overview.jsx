import React, { useState, useEffect } from "react";
import "../Stylesheets/Student_Overview.css";
import { LiaNotesMedicalSolid } from "react-icons/lia";
import { FaBook, FaCalendarAlt } from "react-icons/fa";
import { GrDocumentPerformance } from "react-icons/gr";
import Modal from "react-modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "600px",  // Adjust width as needed
    borderRadius: "10px",
    padding: "20px",
  },
};

Modal.setAppElement("#root");

const Student_Data_View = (props) => {
  const [holidayModalIsOpen, setHolidayModalIsOpen] = useState(false);
  const [holidays, setHolidays] = useState([]);

  const openHolidayModal = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getHolidays'); 
      setHolidays(response.data); 
      setHolidayModalIsOpen(true);
    } catch (error) {
      console.error("Error fetching holidays:", error);
      toast.error("Failed to load holidays.");
    }
  };

  const closeHolidayModal = () => setHolidayModalIsOpen(false);

  return (
    <>
      <div className="overview">
        <div className="rank" onClick={()=>props.onTabChange()}>
          <div className="overview_boxes student_rank">
            <LiaNotesMedicalSolid />
          </div>
          <div className="rank_text">View Assignments</div>
        </div>
        <div className="student_attendance">
          <div className="overview_boxes attendance">
            <FaBook />
          </div>
          <div className="attendance_text">Attendance</div>
        </div>
        <div className="student_achievements" onClick={openHolidayModal}>
          <div className="overview_boxes achievements">
            <FaCalendarAlt />
          </div>
          <div className="achievement_text">Holidays</div>
        </div>
        <div className="student_performance">
          <div className="overview_boxes performance">
            <GrDocumentPerformance />
          </div>
          <div className="performance_text">Performance</div>
        </div>
      </div>

      <Modal
        isOpen={holidayModalIsOpen}
        onRequestClose={closeHolidayModal}
        style={customStyles}
        contentLabel="Holidays"
      >
        <h2>Holidays</h2>
        {holidays.length > 0 ? (
          <table className="holidays-table">
            <thead>
              <tr style={{backgroundColor:"#6c48c5"}}>
                <th>Date</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {holidays.map((holiday, index) => (
                <tr key={index}>
                  <td>{holiday.date}</td>
                  <td>{holiday.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No holidays found.</p>
        )}
        <button onClick={closeHolidayModal}>Close</button>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default Student_Data_View;
