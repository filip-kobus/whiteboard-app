import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App.js'
import { AuthProvider } from "react-oidc-context";
import 'bootstrap/dist/css/bootstrap.min.css';

const cognitoAuthConfig = {
  authority: process.env.REACT_APP_COGNITO_AUTHORITY,
  client_id: process.env.REACT_APP_COGNITO_CLIENT_ID,
  redirect_uri: "http://localhost:3000/",
  response_type: "code",
  scope: "phone openid email",
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider {...cognitoAuthConfig}>
    <App />
  </AuthProvider>
);

reportWebVitals();
