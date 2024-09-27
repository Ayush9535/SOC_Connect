import React, { useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateAssignment = () => {
  const [assignmentData, setAssignmentData] = useState({
    title: '',
    description: '',
    dueDate: '',
    courseCode: ''
  });

  const courseOptions = [
    { name: "Data Structures", code: "CS101" },
    { name: "Algorithms", code: "CS102" },
    { name: "Operating Systems", code: "CS201" },
    { name: "Computer Networks", code: "CS202" },
    { name: "Database Management Systems", code: "CS301" },
    { name: "Artificial Intelligence", code: "CS302" },
    { name: "Software Engineering", code: "CS401" },
    { name: "Machine Learning", code: "CS402" },
    { name: "Cloud Computing", code: "CS403" },
    { name: "Cybersecurity", code: "CS404" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssignmentData({
      ...assignmentData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let note = toast.loading("Please Wait...", { position: "top-center" });

    try {
      const token = localStorage.getItem('token');
      const user = jwtDecode(token); 
      
      const assignmentPayload = {
        title: assignmentData.title,
        description: assignmentData.description,
        subjectId: assignmentData.courseCode, 
        deadline: assignmentData.dueDate
      };
      console.log('Assignment Payload:', assignmentPayload);
      const response = await axios.post(`http://localhost:3000/assignment/${user.email}`, assignmentPayload);
  
      console.log('Assignment Created:', response.data);
      toast.update(note, {
        render: "Assigment Created Successfully",
        type: "success",
        isLoading: false,
        autoClose: 2000,
        hideProgressBar: true,
        theme: "colored"
      });
  
      setAssignmentData({
        title: '',
        description: '',
        dueDate: '',
        courseCode: ''
      });
  
    } catch (error) {
      console.error('Error creating assignment:', error);
      toast.update(note, {
        render: "Error creating assignment",
        type: "error",
        isLoading: false,
        autoClose: 2000,
        hideProgressBar: true,
        theme: "colored"
      });
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
          <select
            id="courseCode"
            name="courseCode"
            value={assignmentData.courseCode}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Course</option>
            {courseOptions.map((course) => (
              <option key={course.code} value={course.code}>
                {course.name} ({course.code})
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Assignment</button>
      </form>

      <ToastContainer />

    </div>
  );
};

export default CreateAssignment;
