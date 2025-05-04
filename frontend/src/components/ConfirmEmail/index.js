import React, { useState, useEffect } from "react";
import { confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import ConfirmForm from "./ConfirmForm";
import CloseButton from "./CloseButton";

export default function Confirm({ email, resendCode = true, onFinish }) {
  const [code, setCode] = useState("");

  const completeSignup = async (e) => {
    e.preventDefault();
    try {
      const { isSignUpComplete } = await confirmSignUp({
        username: email,
        confirmationCode: code,
      });

      if (isSignUpComplete) {
        onFinish();
        alert("User confirmed, please login again.");
      } else {
        alert("Failed to confirm sign-up. Please try again.");
      }
    } catch (error) {
      console.error("Error confirming sign-up:", error);
      alert("Failed to confirm sign-up. Please try again.");
    }
  };

  const handleResend = React.useCallback(async () => {
    try {
      await resendSignUpCode({ username: email });
      alert("Confirmation code resent successfully.");
    } catch (error) {
      console.error("Error resending confirmation code:", error);
      alert("Failed to resend confirmation code. Please try again.");
    }
  }, [email]);

  useEffect(() => {
    if (resendCode) {
      handleResend();
    }
  }, [resendCode, handleResend]);

  return (
    <div className="content-section">
      <div className="content-container position-relative">
        <CloseButton onClick={onFinish} />
        <h2 className="text-center title mb-4">Confirm account</h2>
        <ConfirmForm
          code={code}
          setCode={setCode}
          onSubmit={completeSignup}
          onResent={handleResend}
        />
      </div>
    </div>
  );
}

