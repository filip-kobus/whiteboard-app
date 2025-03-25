import ReactDOM from 'react-dom/client';
import App from './App.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import config from './config';
import { Amplify } from 'aws-amplify'


Amplify.configure({
    Auth: {
      Cognito: {
        userPoolClientId: config.cognito.APP_CLIENT_ID,
        userPoolId: config.cognito.USER_POOL_ID,
        loginWith: {
            username: 'true',
            email: 'true',
          }
      }
    }
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);