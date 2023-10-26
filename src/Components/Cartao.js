import { Box, Button, CardActionArea, Container, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { TagAutor } from './TagAutor';

const maxDescriptionLength = 128;

function Botao(params) {
  return (
    <Grid item xs={6}><Button variant="outlined" sx={{borderRadius: '50%'}} href={params.url} onClick={params.action}>{params.nome}</Button></Grid>
  );
}

function CartaoMidia(params) {
  return (
    <CardMedia
      component="div"
      sx={{pt: params.editavel ? '0': '56.25%', position: 'relative'}}
      image={params.miniatura}
    >
      {params.editavel 
      ? <Grid>
          <Botao url={`/expo/${params.id}`} nome="visualizar" />
          <Botao url={`/expo/${params.id}/editar`} nome="editar" />
          <Botao nome="trocar miniatura" />
          <Botao nome="remover miniatura" />
        </Grid>
      : <TagAutor nome={params.organizador} />}
    </CardMedia>
  );
}

function CartaoConteudo(params) {
  return (
    <Box sx={{backgroundColor: 'primary.light', height: '100%'}}>
      <CardContent sx={{ flexGrow: 1}}>
        <Typography gutterBottom variant="h5" component="h2">
          {params.nome}
        </Typography>
        <Typography>
          {params.descricao}
        </Typography>
      </CardContent>
    </Box>
  );
}

export default function Cartao(item) {
  if (item.info.descricao && item.info.descricao.length > maxDescriptionLength)
    item.info.descricao = item.info.descricao.substring(0, maxDescriptionLength - 3).concat('...');
  var card = item.info;
  return (
    <Card sx={{height: '100%'}}>
      <CardActionArea sx={{height: '100%'}} href={item.editavel ? '': '/exposicoes/'+card.id}>
          <CartaoMidia miniatura={card.urlMiniatura} organizador={card.organizador} editavel={item.editavel} id={card.id}/>
          <CartaoConteudo nome={card.nome} descricao={card.descricao} />
      </CardActionArea>
    </Card>
  );
}