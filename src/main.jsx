import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
// import createRoot from 'react-dom'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <GoogleOAuthProvider clientId="974439723387-kf7cvj1qrtqe3h5qe2rq3ma5on3uatk1.apps.googleusercontent.com">
     <App />
     </GoogleOAuthProvider>
  </StrictMode>
)
