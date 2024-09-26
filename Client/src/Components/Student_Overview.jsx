import React from "react";
import "../Stylesheets/Student_Overview.css";

const Student_Data_View = (props) => {
  return (
    <>
      <div className="overview">
        <div className="rank">
          <div className="overview_boxes student_rank">
            {props.rank_of_student}
          </div>
          <div className="rank_text">Class Rank</div>
        </div>
        <div className="student_attendance">
          <div className="overview_boxes attendance">
            {props.attendance_of_student}
          </div>
          <div className="attendance_text">Attendance</div>
        </div>
        <div className="student_achievements">
          <div className="overview_boxes achievements">
            {props.achievement_of_student}
          </div>
          <div className="achievement_text">Achievements</div>
        </div>
        <div className="student_performance">
          <div className="overview_boxes performance">
            {props.performance_of_student}
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
