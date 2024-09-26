import React, { useState } from "react";
import "../Stylesheets/Student_Overview.css";
import { LiaNotesMedicalSolid } from "react-icons/lia";
import { FaCalendarAlt } from "react-icons/fa";
import { CiMail, CiViewList } from "react-icons/ci";

const Faculty_View = (props) => {
  const [showForm, setShowForm] = useState(false); 

  const handleCreateAssignmentClick = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <div className="overview">
        <div className="rank" onClick={handleCreateAssignmentClick}>
          <div className="overview_boxes student_rank">
            <LiaNotesMedicalSolid />
          </div>
          <div className="rank_text">Create Assignment</div>
        </div>

        <div className="student_attendance">
          <div className="overview_boxes attendance">
            <FaCalendarAlt />
          </div>
          <div className="attendance_text">Holidays</div>
        </div>

        <div className="student_achievements">
          <div className="overview_boxes achievements">
            <CiMail />
          </div>
          <div className="achievement_text">Apply for Leave</div>
        </div>

        <div className="student_performance">
          <div className="overview_boxes performance">
            <CiViewList />
          </div>
          <div className="performance_text">Class List</div>
        </div>
      </div>

      {/* Conditionally render the form based on state */}
      {showForm && (
        <div className="create-assignment-form">
          <h3>Create New Assignment</h3>
          <form>
            <div className="form-group">
              <label>Assignment Title:</label>
              <input type="text" placeholder="Enter title" />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea placeholder="Enter description"></textarea>
            </div>
            <div className="form-group">
              <label>Due Date:</label>
              <input type="date" />
            </div>
            <div className="form-group">
              <label>Class:</label>
              <select>
                <option>Select Class</option>
                <option>Class A</option>
                <option>Class B</option>
              </select>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Faculty_View;
