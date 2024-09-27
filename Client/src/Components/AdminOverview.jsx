import React, { useEffect, useState } from "react";
import "../Stylesheets/Student_Overview.css";
import "../Stylesheets/holidaymodal.css";
import { FaCalendarAlt } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaBuildingColumns } from "react-icons/fa6";
import axios from 'axios';

const AdminView = () => {
  const [date, setDate] = useState('');
  const [day, setDay] = useState('');
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showLeavesModal, setShowLeavesModal] = useState(false); 
  const [leaves, setLeaves] = useState([]);

  const handleAddHoliday = async () => {
    const newHoliday = { date, day, description };
    try {
      await axios.post('http://localhost:5000/holidays/addholiday', newHoliday);
      alert('Holiday added successfully!');
      setDate('');
      setDay('');
      setDescription('');
      setShowModal(false);
    } catch (error) {
      console.error('Error adding holiday', error);
    }
  };

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getleaves');
        console.log(response.data);
        setLeaves(response.data);
      } catch (error) {
        console.error('Error fetching leaves', error);
      }
    };
    fetchLeaves();
  }, []);

  return (
    <>
      <div className="overview">
        <div className="rank" onClick={() => setShowModal(true)}>
          <div className="overview_boxes student_rank">
            <FaCalendarAlt />
          </div>
          <div className="rank_text">Manage Holidays</div>
        </div>

        <div className="student_attendance">
          <div className="overview_boxes attendance">
            <PiStudentBold />
          </div>
          <div className="attendance_text">Manage Students</div>
        </div>

        <div className="student_achievements">
          <div className="overview_boxes achievements">
            <FaChalkboardTeacher />
          </div>
          <div className="achievement_text">Manage Faculties</div>
        </div>

        <div className="student_performance" onClick={() => setShowLeavesModal(true)}>
          <div className="overview_boxes performance">
            <FaBuildingColumns />
          </div>
          <div className="performance_text">Manage Leaves</div>
        </div>
      </div>

      {showModal && (
        <>
          <div className="modal-overlay" onClick={() => setShowModal(false)}></div>
          <div className="modal">
            <h2>Add a Holiday</h2>
            <label>Date:</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />

            <label>Day:</label>
            <input
              type="text"
              value={day}
              onChange={e => setDay(e.target.value)}
            />

            <label>Description:</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
            />

            <button onClick={handleAddHoliday}>Submit</button>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </>
      )}

      {showLeavesModal && (
        <>
          <div className="modal-overlay" onClick={() => setShowLeavesModal(false)}></div>
          <div className="modal" style={{width:"800px"}}>
            <h2>Leaves Overview</h2>
            <table className="leave-table">
              <thead>
                <tr>
                  <th>Faculty Name</th>
                  <th>Leave Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => {
                  return <tr key={leave._id}>
                    <td>{leave.facultyId?.email || "Unknown"}</td> 
                    <td>{leave.leaveType}</td>
                    <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                    <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                    <td>{leave.reason}</td>
                    <td>{leave.status}</td>
                  </tr>
})}
              </tbody>
            </table>
            <button onClick={() => setShowLeavesModal(false)}>Close</button>
          </div>
        </>
      )}
    </>
  );
};

export default AdminView;
