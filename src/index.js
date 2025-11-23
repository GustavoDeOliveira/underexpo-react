import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from "react-router-dom";
import router from './router';
import { GoogleOAuthProvider } from "@react-oauth/google";

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <GoogleOAuthProvider clientId='237551140245-l488soclhvsrhr607e44rjqabsqavvpa.apps.googleusercontent.com'>
    <HelmetProvider>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Helmet>
      <RouterProvider router={router} />
    </HelmetProvider>
  </GoogleOAuthProvider>
);
