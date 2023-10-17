import { Box, CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { TagAutor } from './TagAutor';

const maxDescriptionLength = 128;

export default function Cartao(item) {
  if (item.info.descricao && item.info.descricao.length > maxDescriptionLength)
    item.info.descricao = item.info.descricao.substring(0, maxDescriptionLength - 3).concat('...');
  var card = item.info;
  return (
    <Card sx={{height: '100%'}}>
      <CardActionArea sx={{height: '100%'}} href={'/exposicoes/'+card.id}>
        <CardMedia
          component="div"
          sx={{pt: '56.25%', position: 'relative'}}
          image={card.urlMiniatura}
        >
          <TagAutor nome={card.organizador} />
        </CardMedia>
        <Box bgcolor="primary.light" sx={{height: '100%'}}>
        <CardContent sx={{ flexGrow: 1}}>
            <Typography gutterBottom variant="h5" component="h2">
              {card.nome}
            </Typography>
            <Typography>
              {card.descricao}
            </Typography>
        </CardContent>
          </Box>
      </CardActionArea>
    </Card>
  );
}