import React, { useEffect, useState } from "react";
import axios from 'axios';
import "../Stylesheets/FeedbackCard.css";  
import {jwtDecode} from 'jwt-decode';

const FeedbackCard = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem('token');
        const decode = jwtDecode(token);
        const response = await axios.get(`http://localhost:3000/feedbacks/${decode.email}`);
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedbacks', error);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <div className="feedback-container">
      <h2>Student Feedback</h2>
      {feedbacks.length === 0 ? (
        <p>No feedback available</p>
      ) : (
        feedbacks.map((feedback) => (
          <div className="feedback-card" key={feedback._id}>
            <h3 className="faculty-name">Faculty: {feedback.facultyId?.email || "Unknown"}</h3>
            <p className="feedback-text">"{feedback.feedback}"</p>
            <p className="feedback-date">Date: {new Date(feedback.feedbackDate).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default FeedbackCard;
