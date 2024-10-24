import React from 'react';
import FacebookLogin from 'react-facebook-login';
import "../App.css";


function FacebookAuth() {
  // Handle response from Facebook
  const responseFacebook = (response) => {
    console.log(response);
    if (response.status !== 'unknown') {
      console.log("User logged in: ", response);
    } else {
      console.log("Login failed");
    }
  };

  return (
    <div>
      <FacebookLogin
        appId="8766127163407957" // Replace with your Facebook App ID
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="facebook-login-btn" // Add custom class for styling
        icon="fa-facebook"
        textButton="Sign in with Facebook" // Remove the text by setting it to an empty string
      />
    </div>
  );
}

export default FacebookAuth;
