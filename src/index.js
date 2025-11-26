import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from "react-router-dom";
import router from './router';
import { GoogleOAuthProvider } from "@react-oauth/google";

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

const clientId = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;

root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <HelmetProvider>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Helmet>
      <RouterProvider router={router} />
    </HelmetProvider>
  </GoogleOAuthProvider>
);
