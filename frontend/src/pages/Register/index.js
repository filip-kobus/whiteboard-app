import React, { useState } from "react";
import { signUp } from "aws-amplify/auth";
import axios from "axios";
import Confirm from "../../components/ConfirmEmail";
import RegisterForm from "./RegisterForm";
import { useAppContext } from "../../libs/contextLib";


function Register() {
  const { isVerified, setVerified, setUserId } = useAppContext();
  
  const [formData, setFormData ] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const signupResult = await signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            name: formData.name,
          },
        },
      });

      const userId = signupResult.userId;
      const apiUrl = process.env.REACT_APP_API_URL;
      await axios.post(`${apiUrl}/adduser`, { userId });
      setUserId(userId)
      setVerified(signupResult.isSignUpComplete);
      
    } catch (err) {
      console.error("Failed to save user to the database:", err);
      alert("An error occurred while saving your data. Please try again.");
    }
  };

  return (
    <div className="content-section">
      <div className="content-container">
        <h2 className="title mb-4">Sign Up</h2>
        <RegisterForm
          formData={formData}
          handleChange={handleChange}
          handleRegister={handleRegister}
        />
      </div>
    </div>
  );
}

export default Register;