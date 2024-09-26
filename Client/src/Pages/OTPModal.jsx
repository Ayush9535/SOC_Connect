import React, { useState } from 'react';
import './Styles/OTPModal.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const OTPModal = ({ email, isOpen, onClose, onSubmitOTP }) => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); 

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    
    const otpVerification = await onSubmitOTP(otp); 
    
    if (otpVerification) {
      setStep(2); 
    } else {
      toast.error('Invalid OTP', { position: "top-center" });
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.put('http://localhost:3000/resetpass', {
        email,
        new_pass: newPassword,
      });

      if (response.status === 200) {
        toast.success('Password updated successfully!', { position: "top-center" });
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (err) {
      console.error('Error resetting password:', err);
      toast.error('Error updating password. Please try again.', { position: "top-center" });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="otp-modal-overlay">
      <div className="otp-modal-content">
        {step === 1 ? (
          <>
            <h2>OTP Verification</h2>
            <p>An OTP has been sent to your registered email address:</p>
            <p><strong>{email}</strong></p>
            <form onSubmit={handleOTPSubmit}>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <div className="otp-modal-actions">
                <button type="submit">Submit OTP</button>
                <button type="button" onClick={onClose}>Close</button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2>Reset Password</h2>
            <form onSubmit={handlePasswordReset}>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <div className="otp-modal-actions">
                <button type="submit">Reset Password</button>
                <button type="button" onClick={onClose}>Close</button>
              </div>
            </form>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default OTPModal;
