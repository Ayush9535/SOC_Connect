import React, { useState } from 'react';
import './Styles/Sign_Up.css';
import mit_logo from '../assets/Logo.jpg';
import axios from 'axios';
import { ToastContainer,  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== rePassword) {
      return toast.error("Passwords do not match", { position: "top-center" });
    }

    let note = toast.loading("Please Wait...", { position: "top-center" });

    try {
      const response = await axios.post('http://localhost:3000/register', {
        email,
        password,
        role: userRole || "student",
      });

      if (response.data == "Registration successful") {
        toast.update(note, {
          render: response.data || "Registration successful",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          hideProgressBar: true,
          theme: "colored"
        });

        setTimeout(() => {
          navigate('/login');
        })
      }

    } catch (err) {
      let errorMessage = "Error during registration";
  
      
      if (err.response) {
          if (err.response.status === 400) {
              errorMessage = err.response.data || "User already exists";
          } else if (err.response.status === 500) {
              errorMessage = "Server error, please try again later";
          }
      } else if (err.message) {
          errorMessage = err.message; 
      }
  
      toast.update(note, {
          render: errorMessage,
          type: "error",
          isLoading: false,
          autoClose: 2000,
          hideProgressBar: true,
          theme: "colored"
      });
  }
  
  };

  return (
    <div className="container">
      <div className="left_side">
        <div className="left_side_content">
          <div className="logo">
            <img src={mit_logo} alt="MIT Logo" style={{borderRadius:"50%"}}/>
          </div>
        </div>
      </div>
      <div className="right_side">
        <div className="login_form">
          <div className="login_header">
            <div className="title">Sign Up</div>
          </div>
          <form onSubmit={handleSignUp}>
            <div className="inputs">
              <div className="input_email">
                <div className="email_id">
                  <div className="input_email_text">Email Id</div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Email Id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="input_password">
                <div className="password">
                  <div className="input_password_text">Password</div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="input_password">
                <div className="password">
                  <div className="input_password_text">Re-enter Password</div>
                  <input
                    type="password"
                    name="re_password"
                    id="re_password"
                    placeholder="Re-enter Password"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="login_as">
                <div className="login_as_text">Register Yourself as</div>
                <select
                  name="user_role"
                  id="user_role"
                  aria-label="Register as"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="student">Student</option>
                  <option value="alumni">Alumni</option>
                  <option value="admin">Admin</option>
                  <option value="faculty">Faculty</option>
                </select>
              </div>
              <div className="login_button">
              <button class="button-3" role="button" type='submit'>Login</button>
              </div>

              <p className='navi'>Already have an account ? <span onClick={()=>navigate("/")}>GO to Login</span></p>

            </div>
          </form>
        </div>
      </div>

      <ToastContainer/>
    </div>
  );
};

export default SignUp;
