import React, { useState } from "react";
import "../Stylesheets/Student_info.css";

const Student_intro = (props) => {
  const [data,setData] = useState([])
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get('http://localhost:3000/getuser');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);
  console.log(data)
  return (
    <>
      <div className="content">
        <div className="left_side">
          <div className="upper">
            <div className="date">27 September 2024</div>
          </div>
          <div className="lower">
            <div className="welcome_text">
              Welcome back,<span className="student_name">Rohit</span>
            </div>
            <div className="welcome_motivation">
              Always stay updated in you student portal
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

export default Student_intro;
