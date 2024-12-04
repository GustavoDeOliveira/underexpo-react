import { Box } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export const CartaoConteudo = (params) => {
  return (
    <Box sx={theme => ({backgroundColor: theme.palette.primary.light, height: '100%'})}>
      <CardContent sx={{ flexGrow: 1, maxHeight: '200px'}}>
        <Typography gutterBottom variant="h5" component="h2">
          {params.nome}
        </Typography>
        <Typography sx={{overflow: 'hidden'}}>
          {params.descricao}
        </Typography>
      </CardContent>
    </Box>
  );
}