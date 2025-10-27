import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import * as React from 'react';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Direitos Reservados © '}
      <Link color="inherit" href="https://github.com/GustavoDeOliveira/underexpo-react?tab=GPL-3.0-1-ov-file#readme">
        UnderExpo
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer() {
  return (
      <Box sx={{ backgroundColor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          <Divider />
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          -
        </Typography>
        <Copyright />
      </Box>
  );
}