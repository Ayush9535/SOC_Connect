import React, { useEffect, useState } from 'react';
import AssignmentCard from './AssignmentCard';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AssignmentList = () => {
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                let token = localStorage.getItem('token');
                let decoded = jwtDecode(token);

                let response = await axios.get(`http://localhost:3000/assignments/${decoded.email}`);
                console.log(response);
                setAssignments(response.data);
            } catch (error) {
                console.error('Error fetching assignments:', error);
            }
        };

        fetchAssignments();
    }, []);

    return (<>
        <h2>All Assignments</h2>
        <div className="assignment-list">
            {assignments.map((assignment) => {
                return <AssignmentCard key={assignment._id} assignment={assignment} />;
            })}
        </div>
    </>
    );
};

export default AssignmentList;
