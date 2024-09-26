import React, { useState,useEffect } from "react";
import axios from "axios";
import "../Stylesheets/Student_info.css";

const AdminIntro = (props) => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <div className="content">
        <div className="left_side">
          <div className="upper">
            <div className="date">27 September 2024</div>
          </div>
          <div className="lower">
            <div className="welcome_text">
              Welcome back,<span className="student_name">Admin</span>
            </div>
            <div className="welcome_motivation">
              Always stay updated in your student portal
            </div>
          </div>
        </div>
        <div className="right_side">
          <div className="animated_image">

          </div>
        </div>
      </div>
    </>
  );
};

export default AdminIntro;
