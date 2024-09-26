import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import GenericTable from '../Components/GenericTable';

const FacultyPersonalDetails = () => {
  const [faculties, setFaculties] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const decodedToken = jwtDecode(token);
        const response = await axios.get(`http://localhost:3000/getfaculties/${decodedToken.email}`);
        setFaculties(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFaculties();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(faculties);

  return (
    <div>
      <h1>Faculty Personal Details</h1>
      <GenericTable data={faculties} />
    </div>
  );
};

export default FacultyPersonalDetails;
