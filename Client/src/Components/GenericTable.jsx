import React, { useState } from 'react';
import '../Stylesheets/GenericTable.css';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const FacultyDetailsTable = ({ data }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(data);

    if (!data || typeof data !== 'object') {
        return <p>No data available</p>;
    }

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split("."); // Split nested keys
    
        setEditedData((prevData) => {
            let updatedData = { ...prevData };
    
            if (keys.length === 1) {
                updatedData[name] = value;
            } else if (keys.length === 2) {
                updatedData[keys[0]] = {
                    ...updatedData[keys[0]],
                    [keys[1]]: value,
                };
            }
    
            return updatedData;
        });
    };
    

    const handleSaveClick = async () => {
        console.log("Saving data:", editedData , data);
        try {
            const token = localStorage.getItem('token'); 
            if (!token) {
                throw new Error('No token found');
            }
    
            const decodedToken = jwtDecode(token);
            const facultyId = decodedToken.email;
    
            const response = await axios.put(`http://localhost:3000/faculty/${facultyId}`, editedData);
    
            console.log("Data saved successfully:", response.data);
            setIsEditing(false);
        } catch (error) {
            console.error("Error saving data:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="faculty-details-container">
            {isEditing ? (
                <form className="faculty-details-edit-form" onSubmit={(e) => { e.preventDefault(); handleSaveClick(); }}>
                {/* General Info */}
                <div className="faculty-details-input-group">
                    <label className="faculty-details-label">Name:</label>
                    <input 
                        className="faculty-details-input"
                        type="text" 
                        name="name" 
                        value={editedData.name || ''} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="faculty-details-input-group">
                    <label className="faculty-details-label">Email:</label>
                    <input 
                        className="faculty-details-input"
                        type="email" 
                        name="email" 
                        value={editedData.email || ''} 
                        onChange={handleChange} 
                    />
                </div>
            
                {/* Personal Info */}
                <div className="faculty-details-input-group">
                    <label className="faculty-details-label">Phone:</label>
                    <input 
                        className="faculty-details-input"
                        type="text" 
                        name="phone" 
                        value={editedData.personalInfo?.phone || ''} 
                        onChange={(e) => setEditedData(prev => ({ 
                            ...prev, 
                            personalInfo: { ...prev.personalInfo, phone: e.target.value } 
                        }))}
                    />
                </div>
                <div className="faculty-details-input-group">
                    <label className="faculty-details-label">Address:</label>
                    <input 
                        className="faculty-details-input"
                        type="text" 
                        name="address" 
                        value={editedData.personalInfo?.address || ''} 
                        onChange={(e) => setEditedData(prev => ({ 
                            ...prev, 
                            personalInfo: { ...prev.personalInfo, address: e.target.value } 
                        }))}
                    />
                </div>
                <div className="faculty-details-input-group">
                    <label className="faculty-details-label">Date of Birth:</label>
                    <input 
                        className="faculty-details-input"
                        type="date" 
                        name="dateOfBirth" 
                        value={editedData.personalInfo?.dateOfBirth || ''} 
                        onChange={(e) => setEditedData(prev => ({ 
                            ...prev, 
                            personalInfo: { ...prev.personalInfo, dateOfBirth: e.target.value } 
                        }))}
                    />
                </div>
                <div className="faculty-details-input-group">
                    <label className="faculty-details-label">Aadhar Number:</label>
                    <input 
                        className="faculty-details-input"
                        type="text" 
                        name="aadharNumber" 
                        value={editedData.personalInfo?.aadharNumber || ''} 
                        onChange={(e) => setEditedData(prev => ({ 
                            ...prev, 
                            personalInfo: { ...prev.personalInfo, aadharNumber: e.target.value } 
                        }))}
                    />
                </div>
                <div className="faculty-details-input-group">
                    <label className="faculty-details-label">Emergency Contact:</label>
                    <input 
                        className="faculty-details-input"
                        type="text" 
                        name="emergencyContact" 
                        value={editedData.personalInfo?.emergencyContact || ''} 
                        onChange={(e) => setEditedData(prev => ({ 
                            ...prev, 
                            personalInfo: { ...prev.personalInfo, emergencyContact: e.target.value } 
                        }))}
                    />
                </div>
                <div className="faculty-details-input-group">
                    <label className="faculty-details-label">Blood Group:</label>
                    <input 
                        className="faculty-details-input"
                        type="text" 
                        name="bloodGroup" 
                        value={editedData.personalInfo?.bloodGroup || ''} 
                        onChange={(e) => setEditedData(prev => ({ 
                            ...prev, 
                            personalInfo: { ...prev.personalInfo, bloodGroup: e.target.value } 
                        }))}
                    />
                </div>
            
                {/* Academic Info */}
                <div className="faculty-details-input-group">
                    <label className="faculty-details-label">Department:</label>
                    <input 
                        className="faculty-details-input"
                        type="text" 
                        name="department" 
                        value={editedData.academicInfo?.department?.name || ''} 
                        onChange={(e) => setEditedData(prev => ({
                            ...prev, 
                            academicInfo: { 
                                ...prev.academicInfo, 
                                department: { ...prev.academicInfo.department, name: e.target.value }
                            } 
                        }))}
                    />
                </div>
                <div className="faculty-details-input-group">
                    <label className="faculty-details-label">Department Head:</label>
                    <input 
                        className="faculty-details-input"
                        type="text" 
                        name="departmentHead" 
                        value={editedData.academicInfo?.department?.head || ''} 
                        onChange={(e) => setEditedData(prev => ({
                            ...prev, 
                            academicInfo: { 
                                ...prev.academicInfo, 
                                department: { ...prev.academicInfo.department, head: e.target.value }
                            } 
                        }))}
                    />
                </div>
                <div className="faculty-details-input-group">
                    <label className="faculty-details-label">Courses:</label>
                    {editedData.academicInfo?.courses?.map((course, index) => (
                        <div key={index} className="faculty-details-course-group">
                            <input 
                                className="faculty-details-input"
                                type="text" 
                                name={`course-${index}-name`} 
                                value={course.name || ''} 
                                placeholder="Course Name"
                                onChange={(e) => {
                                    const newCourses = [...editedData.academicInfo.courses];
                                    newCourses[index].name = e.target.value;
                                    setEditedData(prev => ({
                                        ...prev,
                                        academicInfo: { ...prev.academicInfo, courses: newCourses }
                                    }));
                                }}
                            />
                            <input 
                                className="faculty-details-input"
                                type="text" 
                                name={`course-${index}-code`} 
                                value={course.code || ''} 
                                placeholder="Course Code"
                                onChange={(e) => {
                                    const newCourses = [...editedData.academicInfo.courses];
                                    newCourses[index].code = e.target.value;
                                    setEditedData(prev => ({
                                        ...prev,
                                        academicInfo: { ...prev.academicInfo, courses: newCourses }
                                    }));
                                }}
                            />
                        </div>
                    ))}
                </div>
            
                <button className="faculty-details-save-button" type="submit">Save Changes</button>
                <button className="faculty-details-cancel-button" type="button" onClick={() => setIsEditing(false)}>Cancel</button>
            </form>
            
            ) : (
                <div>
                    <table className="faculty-details-table">
                        <thead>
                            <tr>
                                <th className="faculty-details-table-header">Property</th>
                                <th className="faculty-details-table-header">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{data.name || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{data.email || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td>Phone</td>
                                <td>{data.personalInfo?.phone || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>{data.personalInfo?.address || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td>Date of Birth</td>
                                <td>{data.personalInfo?.dateOfBirth || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td>Aadhar Number</td>
                                <td>{data.personalInfo?.aadharNumber || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td>Emergency Contact</td>
                                <td>{data.personalInfo?.emergencyContact || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td>Blood Group</td>
                                <td>{data.personalInfo?.bloodGroup || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td>Department</td>
                                <td>{data.academicInfo?.department?.name || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td>Department Head</td>
                                <td>{data.academicInfo?.department?.head || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td>Courses</td>
                                <td>
                                    {data.academicInfo?.courses?.length > 0 ? (
                                        data.academicInfo.courses.map((course, index) => (
                                            <div key={index}>
                                                <strong>{course.name || 'N/A'}</strong> (Code: {course.code || 'N/A'})
                                            </div>
                                        ))
                                    ) : (
                                        'N/A'
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="faculty-details-edit-button" onClick={handleEditClick}>Edit</button>
                </div>
            )}
        </div>
    );
};

export default FacultyDetailsTable;
