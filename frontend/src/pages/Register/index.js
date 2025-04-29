import React, { useState } from "react";
import { signUp } from "aws-amplify/auth";
import axios from "axios";
import Confirm from "./Confirm";
import RegisterForm from "./RegisterForm";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSigned, setIsSigned] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { userId } = await signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            name: formData.name,
          },
        },
      });

      const apiUrl = process.env.REACT_APP_API_URL;
      await axios.post(`${apiUrl}/adduser`, { userId });
      setIsSigned(false);
    } catch (err) {
      console.error("Failed to save user to the database:", err);
      alert("An error occurred while saving your data. Please try again.");
    }
  };

  if (!isSigned) return <Confirm username={formData.email} />;

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