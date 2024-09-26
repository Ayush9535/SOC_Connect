import React from 'react';
import '../Stylesheets/GenericTable.css';

const FacultyDetailsTable = ({ data }) => {
    if (!data || typeof data !== 'object') {
        return <p>No data available</p>;
    }

    return (
        <table className="faculty-details-table">
            <thead>
                <tr>
                    <th>Property</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {/* Displaying name and email */}
                <tr>
                    <td>Name</td>
                    <td>{data.name}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{data.email}</td>
                </tr>

                {/* Displaying personal information */}
                <tr>
                    <td>Phone</td>
                    <td>{data.personalInfo.phone}</td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td>{data.personalInfo.address}</td>
                </tr>
                <tr>
                    <td>Date of Birth</td>
                    <td>{data.personalInfo.dateOfBirth}</td>
                </tr>
                <tr>
                    <td>Aadhar Number</td>
                    <td>{data.personalInfo.aadharNumber}</td>
                </tr>
                <tr>
                    <td>Emergency Contact</td>
                    <td>{data.personalInfo.emergencyContact}</td>
                </tr>
                <tr>
                    <td>Blood Group</td>
                    <td>{data.personalInfo.bloodGroup}</td>
                </tr>

                {/* Displaying academic information */}
                <tr>
                    <td>Department</td>
                    <td>{data.academicInfo.department.name}</td>
                </tr>
                <tr>
                    <td>Department Head</td>
                    <td>{data.academicInfo.department.head}</td>
                </tr>

                {/* Displaying courses one by one */}
                <tr>
                    <td>Courses</td>
                    <td>
                        {data.academicInfo.courses.map((course, index) => (
                            <div key={index}>
                                <strong>{course.name}</strong> (Code: {course.code})
                            </div>
                        ))}
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default FacultyDetailsTable;
