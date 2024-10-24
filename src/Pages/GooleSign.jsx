import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import "../App.css"; // Assuming your custom CSS is in App.css

const GoogleSign = ({ onSuccess, onError }) => {
  return (
    <div className="google-signin-container">
<GoogleLogin
  onSuccess={onSuccess}
  onError={onError}
  theme="outline" // Optional: 'outline' or 'filled'
  // size="large" // Can be 'small', 'medium', or 'large'
  className="google-login-button" // Apply the custom class here
/>
    </div>
  );
};

export default GoogleSign;
