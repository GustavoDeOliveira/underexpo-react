import React from 'react';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Link as RouterLink, MemoryRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';

const LinkBehavior = React.forwardRef((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return <RouterLink data-testid="custom-link" ref={ref} to={href} {...other} />;
});

LinkBehavior.propTypes = {
  href: PropTypes.oneOfType([
    PropTypes.shape({
      hash: PropTypes.string,
      pathname: PropTypes.string,
      search: PropTypes.string,
    }),
    PropTypes.string,
  ]).isRequired,
};

function Router(props) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/">{children}</StaticRouter>;
  }

  return <MemoryRouter>{children}</MemoryRouter>;
}

Router.propTypes = {
  children: PropTypes.node,
};

const lightPalette = {
  primary: {
    main: '#4B1B2E',
  },
  secondary: {
    main: '#92567B',
  },
  text: {
    primary: '#1e1e1e',
    secondary: '#1e1e1e',
    disabled: '#666666',
  },
  background: {
    default: '#F8F1F6',
    paper: '#fff'
  }
};

const darkPalette = {
  primary: {
    main: '#F7D4BC',
  },
  secondary: {
    main: '#FAE3E3',
  },
  text: {
    primary: '#ffffff',
    secondary: '#dddddd',
    disabled: '#777',
  },
  background: {
    default: '#121212',
    paper: '#1e1e1e',
  }
};

const componentSettings = {
  MuiLink: {
    defaultProps: {
      component: LinkBehavior,
    },
  },
  MuiButtonBase: {
    defaultProps: {
      LinkComponent: LinkBehavior,
    },
  },
};

const getTheme = (isDarkMode) => extendTheme({
    colorSchemes: {
      light: {
        palette: lightPalette
      },
      dark: {
        palette: darkPalette,
      },
    },

    components: componentSettings,

    // Mantém modo coerente entre MUI5 e MUI6
    cssVarPrefix: 'mui',

    // Define o modo atual
    colorScheme: isDarkMode ? 'dark' : 'light',
  });

export default getTheme;
