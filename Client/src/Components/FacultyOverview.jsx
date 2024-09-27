import React, { useState, useEffect } from "react";
import "../Stylesheets/Student_Overview.css";
import { LiaNotesMedicalSolid } from "react-icons/lia";
import { FaCalendarAlt } from "react-icons/fa";
import { CiMail, CiViewList } from "react-icons/ci";
import Modal from "react-modal";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    borderRadius: "10px",
    padding: "20px",
  },
};

Modal.setAppElement("#root");

const Faculty_View = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [leaveData, setLeaveData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [message, setMessage] = useState("");
  const [holidays, setHolidays] = useState([]);
  const [holidayModalIsOpen, setHolidayModalIsOpen] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveData({ ...leaveData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const user = jwtDecode(token);

      let note = toast.loading("Please Wait...", { position: "top-center" });

      const leaveRequest = {
        facultyId: user.email,
        leaveType: leaveData.leaveType,
        startDate: leaveData.startDate,
        endDate: leaveData.endDate,
        reason: leaveData.reason,
      };

      const response = await axios.post('http://localhost:3000/apply-leave', leaveRequest);

      if (response.status === 201) {
        toast.update(note, {
          render: "Leave submitted successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          hideProgressBar: true,
          theme: "colored"
        });
      } else if (response.status === 400) {
        toast.update(note, {
          render: "Bad Request: Please check your input.",
          type: "error",
          isLoading: false,
          autoClose: 2000,
          hideProgressBar: true,
          theme: "colored"
        });
      } else if (response.status === 401) {
        toast.update(note, {
          render: "Unauthorized: Please login to continue.",
          type: "error",
          isLoading: false,
          autoClose: 2000,
          hideProgressBar: true,
          theme: "colored"
        });
      } else {
        toast.update(note, {
          render: "Failed to submit leave application",
          type: "error",
          isLoading: false,
          autoClose: 2000,
          hideProgressBar: true,
          theme: "colored"
        });
      }

      console.log("Leave submitted: ", response.data);
      setMessage("Leave application submitted successfully!");

      setLeaveData({
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: "",
      });

      setModalIsOpen(false);
    } catch (error) {
      console.error("Error submitting leave:", error);
      setMessage("Failed to submit leave application");
    }
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <div className="overview">
        <div className="rank">
          <div className="overview_boxes student_rank">
            <LiaNotesMedicalSolid />
          </div>
          <div className="rank_text">Create Assignment</div>
        </div>

        <div className="student_attendance" onClick={openHolidayModal}>
          <div className="overview_boxes attendance">
            <FaCalendarAlt />
          </div>
          <div className="attendance_text">Holidays</div>
        </div>

        <div className="student_achievements" onClick={openModal}>
          <div className="overview_boxes achievements">
            <CiMail />
          </div>
          <div className="achievement_text">Apply for Leave</div>
        </div>

        <div className="student_performance" onClick={() => props.onTabChange('classList')}>
          <div className="overview_boxes performance">
            <CiViewList />
          </div>
          <div className="performance_text">Class List</div>
        </div>

      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Apply for Leave"
      >
        <h2>Apply for Leave</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="leaveType">Leave Type:</label>
            <select
              id="leaveType"
              name="leaveType"
              value={leaveData.leaveType}
              onChange={handleChange}
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Earned Leave">Earned Leave</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={leaveData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={leaveData.endDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reason">Reason for Leave:</label>
            <textarea
              id="reason"
              name="reason"
              value={leaveData.reason}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </form>
        {message && <p>{message}</p>}
      </Modal>

      {/* Holidays Modal */}
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
              <tr style={{ backgroundColor: "#6c48c5" }}>
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

export default Faculty_View;
