import React, { useState } from "react";
import { signUp } from "aws-amplify/auth";
import axios from "axios";
import Confirm from "../../components/ConfirmEmail";
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../libs/contextLib";


function Register() {
  const Navigate = useNavigate();
    const { setIsLoading } = useAppContext();
  

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const resetFormData = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFinish = () => {
    setIsConfirmVisible(false);
    resetFormData();
    Navigate("/login");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { email, password, name } = formData;
      const signupResult = await signUp({
        username: email,
        password,
        options: {
          userAttributes: { name },
        },
      });

      const { userId } = signupResult;
      const apiUrl = process.env.REACT_APP_API_URL;
      await axios.post(`${apiUrl}/adduser`, { userId:userId });
      setIsConfirmVisible(true);

    } catch (err) {
      console.error("Failed to save user to the database:", err);
      alert("An error occurred while saving your data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return isConfirmVisible ? (
    <Confirm email={formData.email} resendCode={false} onFinish={handleFinish} />
  ) : (
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