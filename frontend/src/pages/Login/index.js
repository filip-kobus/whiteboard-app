import React, { useState } from "react";
import { signIn, getCurrentUser } from 'aws-amplify/auth';
import { useAppContext } from "../../libs/contextLib";
import LoginForm from "./LoginForm";
import AlertMessage from "./AlertMessage";
import Confirm from "../../components/ConfirmEmail";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });
  const [showConfirm, setShowConfirm] = useState(false);
  const { userHasAuthenticated, setUserId } = useAppContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    resetAlert();

    try {
      const signInStatus = await signIn({ username: email, password });

      if (!signInStatus.isSignedIn) {
        setShowConfirm(true);
      } else {
        handleSuccessfulLogin();
      }
    } catch (error) {
      handleLoginError(error);
    }
  };

  const resetAlert = () => setAlert({ show: false, variant: '', message: '' });

  const handleSuccessfulLogin = async () => {
    setAlert({
      show: true,
      variant: 'success',
      message: 'Login successful! Redirecting...',
    });
    const user = await getCurrentUser();
    setUserId(user['userId']);
    userHasAuthenticated(true);
  };

  const handleLoginError = (error) => {
    console.error('Login error:', error);
    setAlert({
      show: true,
      variant: 'danger',
      message: error.message || 'Login failed. Please try again.',
    });
  };

  const handleFinish = () => {
    setShowConfirm(false);
    resetAlert();
  }

  const renderAlertMessage = () =>
    alert.show && (
      <AlertMessage
        show={alert.show}
        variant={alert.variant}
        message={alert.message}
        onClose={resetAlert}
      />
    );

  const renderContent = () =>
    showConfirm ? (
      <Confirm email={email} onClose={() => setShowConfirm(false)} onFinish={handleFinish} />
    ) : (
      <div className="content-section">
        <div className="content-container">
          <h2 className="text-center title mb-4">Sign in</h2>
          {renderAlertMessage()}
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    );

  return <>{renderContent()}</>;
}

export default Login;
