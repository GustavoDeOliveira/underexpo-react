import { Box, Button, CardActionArea, Container, Grid, Tooltip } from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import UploadIcon from '@mui/icons-material/Upload';
import RemoveIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { TagAutor } from './TagAutor';
import './cartao.css';

const maxDescriptionLength = 128;

function Botao(params) {
  return (
    <Grid item xs={6}><Tooltip followCursor disableInteractive title={params.nome}><Button variant="contained"  className={'acao-card' + (params.destacar ? ' destacado': '')} href={params.url} onClick={params.action} >{params.icone}</Button></Tooltip></Grid>
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
      ? <Grid container spacing={2} alignContent="space-evenly" justifyContent="space-evenly" alignItems="center" sx={{pt: '8px', pb: '8px'}}>
          <Botao url={`/exposicoes/${params.id}`} nome="visualizar" icone={<PreviewIcon fontSize="large" />} />
          <Botao url={`/exposicoes/${params.id}/editar`} nome="editar" icone={<EditIcon fontSize="large" />} />
          <Botao nome="trocar miniatura" icone={<UploadIcon fontSize="large" />} />
          <Botao nome="excluir exposição" icone={<RemoveIcon fontSize="large" />} destacar />
        </Grid>
      : <TagAutor nome={params.organizador} />}
    </CardMedia>
  );
}

function CartaoConteudo(params) {
  return (
    <Box sx={theme => ({backgroundColor: theme.palette.primary.light, height: '100%'})}>
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
      <CardActionArea className="card" disableRipple={item.editavel} sx={{height: '100%'}} href={item.editavel ? '': '/exposicoes/'+card.id}>
          <CartaoMidia miniatura={card.urlMiniatura} organizador={card.organizador} editavel={item.editavel} id={card.id}/>
          <CartaoConteudo nome={card.nome} descricao={card.descricao} />
      </CardActionArea>
    </Card>
  );
}