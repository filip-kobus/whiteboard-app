import React, { useState } from "react";
import { confirmSignUp } from "aws-amplify/auth";
import { Navigate } from "react-router-dom";
import ConfirmForm from "./ConfirmForm";

export default function Confirm({ username }) {
  const [code, setCode] = useState("");
  const [isSigned, setIsSigned] = useState(false);

  async function completeSignup(e) {
    e.preventDefault();
    try {
      const { isSignUpComplete } = await confirmSignUp({
        username: username,
        confirmationCode: code,
      });
      setIsSigned(isSignUpComplete);
    } catch (error) {
      console.error("Error confirming sign-up:", error);
      alert("Failed to confirm sign-up. Please try again.");
    }
  }

  return (
    <div className="content-section">
      <div className="content-container">
        {!isSigned && (
          <>
            <h2 className="text-center title mb-4">Confirm account</h2>
            <ConfirmForm code={code} setCode={setCode} onSubmit={completeSignup} />
          </>
        )}
        {isSigned && <Navigate to="/login" replace />}
      </div>
    </div>
  );
}