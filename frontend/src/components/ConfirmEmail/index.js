import React, { useState } from "react";
import { confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import { Navigate, useNavigate } from "react-router-dom";
import ConfirmForm from "./ConfirmForm";
import { useAppContext } from "../../libs/contextLib";

export default function Confirm({ resendCode = true}) {
  const [code, setCode] = useState("");
  const [isSigned, setIsSigned] = useState(false);
  const navigate = useNavigate();
  const { isVerified, setVerified, userId } = useAppContext();

  async function completeSignup(e) {
    e.preventDefault();
    try {
      const { isSignUpComplete } = await confirmSignUp({
        username: userId,
        confirmationCode: code,
      });
      if (isSignUpComplete) {
        setVerified(true);
        navigate("/login");
      } else {
        alert("Failed to confirm sign-up. Please try again.");
      }
    } catch (error) {
      console.error("Error confirming sign-up:", error);
      alert("Failed to confirm sign-up. Please try again.");
    }
  }

  async function handleResend() {
    try {
      const res = await resendSignUpCode(userId);
      alert("Confirmation code resent successfully.");
    } catch (error) {
      console.error("Error resending confirmation code:", error);
      alert("Failed to resend confirmation code. Please try again.");
    }
  }

  function handleCancel() {
    setIsSigned(true);
    navigate("/");
  }

  React.useEffect(() => {
    if (resendCode) {
      handleResend();
    }
  }, [resendCode]);

  return (
    <div className="content-section">
      <div className="content-container position-relative">
        <button
          className="btn btn-secondary position-absolute top-0 end-0 m-3"
          onClick={handleCancel}
          style={{ background: "none", border: "none", fontSize: "1.5rem", color: "black" }}
        >
          &times;
        </button>
        {!isSigned && (
          <>
            <h2 className="text-center title mb-4">Confirm account</h2>
            <ConfirmForm
              code={code}
              setCode={setCode}
              onSubmit={completeSignup}
              onResent={handleResend}
            />
          </>
        )}
      </div>
    </div>
  );
}