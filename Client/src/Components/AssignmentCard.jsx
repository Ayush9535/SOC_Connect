import React from 'react';
import '../Stylesheets/AssignmentCard.css';

const AssignmentCard = ({ assignment }) => {
    const { title, description, subjectId, deadline, status } = assignment;

    const formattedDate = new Date(deadline).toLocaleDateString();

    return (
        <div className="assignment-card">
            <h3 className="assignment-title">{title}</h3>
            <p className="assignment-description">{description}</p>
            <div className="assignment-details">
                <p className="assignment-subject">Subject ID: {subjectId}</p>
                <p className="assignment-deadline">Deadline: {formattedDate}</p>
                <p className={`assignment-status ${status.toLowerCase()}`}>
                    Status: {status}
                </p>
            </div>
        </div>
    );
};

export default AssignmentCard;
