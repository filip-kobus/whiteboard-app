import { confirmSignUp } from 'aws-amplify/auth';
import { Navigate } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import React, { useState } from "react";


export default function Confirm({ username }) {
    const [code, setCode] = useState(null)
    const [isSigned, setIsSigned] = useState(false)
     
    async function completeSignup() {
        const { isSignUpComplete, nextStep } = await confirmSignUp({
            username: username,
            confirmationCode: code
        });
        setIsSigned(isSignUpComplete)
    }
        
    return (
        <div className="content-section">
        <div className="content-container">
          {!isSigned && 
            <>
            <h2 className="text-center title mb-4">Confirm account</h2>
                <Form className="form" onSubmit={completeSignup}>

                <Form.Group className="mb-3">
                    <Form.Label>Code</Form.Label>
                    <Form.Control
                    type="code"
                    placeholder="Enter code from your email"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 submit-button">
                    Confirm
                </Button>
            </Form>
            </>
            }
            {isSigned && <Navigate to="/login" replace />}
        </div>
    </div>
    )
}