import React from "react";
import "../Stylesheets/Student_Overview.css";
import { LiaNotesMedicalSolid } from "react-icons/lia";
import { FaCalendarAlt } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { CiViewList } from "react-icons/ci";

const Faculty_View = (props) => {
  return (
    <>
      <div className="overview">
        <div className="rank">
          <div className="overview_boxes student_rank">
            <LiaNotesMedicalSolid/>
          </div>
          <div className="rank_text">Create Assignment</div>
        </div>
        <div className="student_attendance">
          <div className="overview_boxes attendance">
            <FaCalendarAlt/>
          </div>
          <div className="attendance_text">Holidays</div>
        </div>
        <div className="student_achievements">
          <div className="overview_boxes achievements">
            <CiMail/>
          </div>
          <div className="achievement_text">Apply for Leave</div>
        </div>
        <div className="student_performance">
          <div className="overview_boxes performance">
            <CiViewList/>
          </div>
          <div className="performance_text">
            Class List
          </div>
        </div>
      </div>
    </>
  );
};

export default Faculty_View;
