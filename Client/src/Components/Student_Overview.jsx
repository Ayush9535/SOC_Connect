import React from "react";
import "../Stylesheets/Student_Overview.css";
import { LiaNotesMedicalSolid } from "react-icons/lia";
import { FaBook } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { GrDocumentPerformance } from "react-icons/gr";

const Student_Data_View = (props) => {
  return (
    <>
      <div className="overview">
        <div className="rank">
          <div className="overview_boxes student_rank">
            <LiaNotesMedicalSolid/>
          </div>
          <div className="rank_text">View Assignments</div>
        </div>
        <div className="student_attendance">
          <div className="overview_boxes attendance">
           <FaBook/>
          </div>
          <div className="attendance_text">Attendance</div>
        </div>
        <div className="student_achievements">
          <div className="overview_boxes achievements">
            <FaCalendarAlt/>
          </div>
          <div className="achievement_text">Holidays</div>
        </div>
        <div className="student_performance">
          <div className="overview_boxes performance">
            <GrDocumentPerformance/>
          </div>
          <div className="performance_text">
            Performance
          </div>
        </div>
      </div>
    </>
  );
};

export default Student_Data_View;
