import React from "react";
import "../Stylesheets/Assignment.css";

const Assignment = (props) => {
  return (
    <>
      <div className="Assignment_Card">
        <div className="left_side">
          <div className="title">DSA Assignment</div>
          <div className="desc">
            The Assigment is based on Tree and Graph Data Structure
          </div>
          <div className="subject_name">Subject : DSA</div>
          <div className="faculty_name">Faculty Name : Shah Rukh Khan</div>
        </div>
        <div className="right_side">
          <div className="right_upper_side">
            <div className="deadline">
              <div className="deadline_text">Deadline</div>
              <div className="deadline_date">7 October 2024</div>
            </div>
            <div className="submisson_date">
              <div className="submisson_date_text">Submisson Date</div>
              <div className="submisson_date_only">5 October 2024</div>
            </div>
            <div className="status">
              <div className="status_text">Status</div>
              <div className="status_update">Pending</div>
            </div>
        </div>
        <div className="right_lower_side">
        </div>
          </div>
          <div className="button-mark_as_done">Mark As Done</div>
      </div>
    </>
  );
};

export default Assignment;
