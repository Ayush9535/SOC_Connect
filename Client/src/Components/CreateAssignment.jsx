import React, { useState } from 'react';
import axios from 'axios';

const CreateAssignment = () => {
  const [assignmentData, setAssignmentData] = useState({
    title: '',
    description: '',
    dueDate: '',
    courseCode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssignmentData({
      ...assignmentData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/assignments', assignmentData);
      console.log('Assignment Created:', response.data);

      setAssignmentData({
        title: '',
        description: '',
        dueDate: '',
        courseCode: ''
      });

    } catch (error) {
      console.error('Error creating assignment:', error);
    }
  };

  return (
    <div className="create-assignment-form">
      <h2>Create New Assignment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Assignment Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={assignmentData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={assignmentData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={assignmentData.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="courseCode">Course Code</label>
          <input
            type="text"
            id="courseCode"
            name="courseCode"
            value={assignmentData.courseCode}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Assignment</button>
      </form>
    </div>
  );
};

export default CreateAssignment;
