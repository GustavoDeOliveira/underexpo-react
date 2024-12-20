import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from "react-router-dom";
import theme from './theme';
import router from './router';
import { GoogleOAuthProvider } from "@react-oauth/google";

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <GoogleOAuthProvider clientId='237551140245-l488soclhvsrhr607e44rjqabsqavvpa.apps.googleusercontent.com'>
    <HelmetProvider>
      <Helmet>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Helmet>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </CssVarsProvider>
    </HelmetProvider>
  </GoogleOAuthProvider>
);
