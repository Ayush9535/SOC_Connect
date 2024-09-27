import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const ViewAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = jwtDecode(token);
        
        const response = await axios.get(`http://localhost:3000/assignments`);
        setAssignments(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching assignments:', err);
        setError('Failed to fetch assignments');
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const markAsDone = async (assignmentId) => {
    try {
      await axios.put(`http://localhost:3000/assignments/${assignmentId}`, { status: 'Completed' });
      setAssignments(assignments.map(assignment => 
        assignment._id === assignmentId ? { ...assignment, status: 'Completed' } : assignment
      ));
    } catch (err) {
      console.error('Error updating assignment status:', err);
    }
  };

  if (loading) {
    return <div>Loading assignments...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>View Assignments</h2>
      {assignments.length === 0 ? (
        <p>No assignments found.</p>
      ) : (
        <table style={{width:"900px"}}>
          <thead>
            <tr style={{backgroundColor:"#6C48C5"}}>
              <th>Title</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment._id}>
                <td>{assignment.title}</td>
                <td>{assignment.description}</td>
                <td>{new Date(assignment.deadline).toLocaleDateString()}</td>
                <td>{assignment.status}</td>
                <td>
                  {assignment.status === 'Pending' && (
                    <button onClick={() => markAsDone(assignment._id)} style={{backgroundColor:"#6c48c5", color:"white", border:"none", padding:"5px"}}>
                      Mark as Done
                    </button>
                  )}
                  {assignment.status === 'Completed' && <span>Completed</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewAssignments;
