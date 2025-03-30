import ReactDOM from 'react-dom/client';
import App from './App.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Amplify } from 'aws-amplify'


Amplify.configure({
    Auth: {
      Cognito: { 
        userPoolClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
        userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
        loginWith: {
            email: 'true',
          }
      }
    }
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);