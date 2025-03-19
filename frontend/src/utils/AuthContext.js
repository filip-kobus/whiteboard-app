import React, { createContext, useContext, useState, useEffect } from "react";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { cognitoConfig } from "./CognitoConfig";

const AuthContext = createContext();

const userPool = new CognitoUserPool(cognitoConfig);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.getSession((err, session) => {
        if (err || !session.isValid()) {
          setUser(null);
        } else {
          setUser(cognitoUser);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = (cognitoUser) => {
    setUser(cognitoUser);
  };

  const logout = () => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
