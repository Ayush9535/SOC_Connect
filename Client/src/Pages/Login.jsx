import React, { useState } from 'react';
import axios from 'axios';
import './Styles/Login.css';
import mit_logo from '../assets/Logo.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import OTPModal from './OTPModal';


const Login = () => {
  const [userRole, setUserRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [OTP, setOTP] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    let note;

    try {
      note = toast.loading("Please Wait...", { position: "top-center" });

      const response = await axios.post('http://localhost:3000/login', { email, password, userRole });

      if (response.data.message === 'Login successful') {
        toast.update(note, {
          render: "Logged in Successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          hideProgressBar: true,
          theme: "colored"
        });
        localStorage.setItem('token', response.data.token);
        console.log(response.data.user.role);
        setTimeout(() => {
          if(response.data.user.role === 'student') {
            navigate('/studentdash');
          } else if(response.data.user.role === 'faculty') {
            navigate('/facultydash');
          }
          else if (response.data.user.role === 'admin') {
            navigate('/admindash');
          }
          else if (response.data.user.role === 'alumni') {
            navigate('/alumnidash');
          }
        }, 2000);
      }
    } catch (err) {
      let errorMessage = "Login Failed, Please Try Again";

      if (err.response && err.response.status === 401) {
        errorMessage = "Wrong password";
      } else if (err.response && err.response.status === 404) {
        errorMessage = "User does not exist";
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

  const handleForgotPassword = async () => {
    if (!email) {
      toast.warn('Please enter your email first.', { position: "top-center" });
      return;
    }
    if (!userRole) {
      toast.warn('Please enter your role first.', { position: "top-center" });
      return;
    }

    let note = toast.loading("Sending OTP...", { position: "top-center" });

    try {
      const response = await axios.post('http://localhost:3000/forgotpassword', { email, userRole });

      if (response.data.code) {
        toast.update(note, {
          render: "OTP sent successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          hideProgressBar: true,
          theme: "colored"
        });
        setIsOTPModalOpen(true);
        setOTP(response.data.code);
      } else {
        toast.update(note, {
          render: "User not found. Please check your email.",
          type: "error",
          isLoading: false,
          autoClose: 2000,
          hideProgressBar: true,
          theme: "colored"
        });
      }
    } catch (err) {
      console.error('Failed to send reset email:', err);
      toast.update(note, {
        render: "Error occurred. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 2000,
        hideProgressBar: true,
        theme: "colored"
      });
    }
  };

  const handleOTPSubmit = async (otp) => {
    if (otp == OTP) {
      return true;
    } else {
      return false;
    }
  };


  return (
    <div className="container" style={{height:"500px"}}>
      <div className="left_side">
        <div className="left_side_content">
          <div className="logo">
            <img src={mit_logo} alt="MIT Logo" style={{ borderRadius: "50%" }} />
          </div>
        </div>
      </div>

      <div className="right_side">
        <div className="login_form">
          <div className="login_header">
            <div className="title">LOGIN</div>
          </div>
          <div className="inputs">
            <form onSubmit={handleLogin}>
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

              <div className="forget_password">
                <a href="#" onClick={handleForgotPassword}>Forgot Password?</a>
              </div>
            </form>

            <p className='navi'>Don't have an account ? <span onClick={() => navigate("/signup")}>Go to Register</span></p>
          </div>
        </div>
      </div>

      <ToastContainer />

      <OTPModal
        email={email}
        isOpen={isOTPModalOpen}
        onClose={() => { setIsOTPModalOpen(false); window.location.reload(); }}
        onSubmitOTP={handleOTPSubmit}
      />
    </div>
  );
};

export default Login;
