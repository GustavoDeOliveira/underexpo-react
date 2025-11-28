import React from 'react'
import ExposicaoApi from '../../Services/api/ExposicaoApi';
import { Box, Button, Container, Stack, TextField, Typography, styled } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import { TagAutor } from '../../Components/TagAutor';
import './exposicao.css';
import { Painel } from '../../Components/Painel';
import ReportIcon from '@mui/icons-material/Report';
import { DialogoConfirmacao } from '../../Components/DialogoConfirmacao';
import { getUserKey } from '../../Services/LocalStorageService';

const api = new ExposicaoApi();

export async function loader({ params }) {
  const p = new Promise((resolve, reject) => {
    api.carregarExposicaoPorId(params.idExposicao, (err, data, res) => {
      if (err) {
        console.log('error: %o', err);
        reject(err);
      }
      else {
        console.log('data: %o', data);
        resolve(data);
      }
    })
  });
  const exposicao = await p;
  exposicao.id = params.idExposicao;
  return { exposicao };
}

async function carregarPainel(idExposicao, idPainel) {
  console.log(idPainel);
  return new Promise((resolve, reject) => {
    api.carregarPainelPorId(idExposicao, idPainel, (err, data, res) => {
      if (err) {
        console.log('error: %o', err);
        reject(err);
      }
      else {
        console.log('res: %o', res.body);
        resolve(res.body);
      }
    })
  });
}

function onClickPainel(painel, painelAtivo, setPainelAtivo) {
  if (painel.id === painelAtivo) setPainelAtivo(0);
  else setPainelAtivo(painel.id);
}

export const Exposicao = () => {
  const { exposicao } = useLoaderData();

  const [painelAtivo, setPainelAtivo] = React.useState(0);
  const [paineis, setPaineis] = React.useState(exposicao.paineis);

  const [denunciando, setDenunciando] = React.useState(false);
  const [descricaoDenuncia, setDescricaoDenuncia] = React.useState('');

  React.useEffect(() => {
    if (painelAtivo) {
      const painel = paineis.find(p => p.id === painelAtivo);
      if (!painel.elementos) {
        carregarPainel(exposicao.id, painelAtivo)
          .then((retornoPainel) => {
            painel.elementos = retornoPainel.elementos;
            painel.contatos = retornoPainel.contatos;
            setPaineis(paineis.map(p => p.id === painel.id ? painel : p));
          });
      }
    }
  }, [painelAtivo]);

  const cancelarDenuncia = () => {
    setDenunciando(false);
    setDescricaoDenuncia('');
  }

  const confirmarDenuncia = () => {
    if (descricaoDenuncia) {
      api.denunciarExposicao({
        descricao: descricaoDenuncia
      }, descricaoDenuncia, exposicao.id, (err, data, res) => {
        if (err) {
          console.log('error: %o', err);
          cancelarDenuncia();
        }
        else {
          console.log('res: %o', res.body);
          window.location = '/exposicoes/';
        }
      });
    }
  }

  return (
    <Box>
      {denunciando ? (
        <DialogoConfirmacao
          id="confirmar-denunciar-exposicao"
          onClose={cancelarDenuncia}
          open={denunciando}
          titulo="Reportar Exposição"
          mensagem={<Box>
            <Typography>Sentimos muito que isso tenha ocorrido :(</Typography>
            <Typography>Por favor, descreva que elementos nessa exposição são ofensivos. Sua identidade não será compartilhada, sendo armazenada apenas para informar ao sistema que você deseja ocultar essa exposição de sua experiência na plataforma.</Typography>
            <TextField error={!descricaoDenuncia} multiline name="descricao" variant="filled" fullWidth label="Descrição" value={descricaoDenuncia} required autoFocus onChange={(ev) => setDescricaoDenuncia(ev.target.value)} align="center" sx={{ pr: '4px' }} />
            <Typography>Ao confirmar o envio, você não verá mais essa exposição na plataforma. Assim que possível, analisaremos seu relato e entraremos em contato com os organizadores.</Typography>
          </Box>}
          botoes={[<Button key="1" onClick={() => confirmarDenuncia()} className="confirmar-critico">Confirmar</Button>, <Button key="2" variant="contained" onClick={cancelarDenuncia} className="cancelar-principal" autoFocus>Cancelar</Button>]}
        />
      ) : ''}
      {getUserKey() ? <Button className="denunciar" onClick={ev => setDenunciando(true)}><Typography>Reportar</Typography><ReportIcon fontSize='large' /></Button> : ''}
      <Container sx={{ position: 'relative', pt: '16px' }}>
        <Typography gutterBottom variant="h2" color="text" align="center">{exposicao.nome}</Typography>
        <TagAutor nome={exposicao.organizador} organizador sx={{ pt: '100%' }} />
      </Container>
      <Typography marginLeft="16px" marginRight="16px" className="descricao" gutterBottom variant="h4" color="text">{exposicao.descricao}</Typography>
      <Stack>
        {paineis.map(painel => (
          <Container key={painel.id} className="painel">
            <Button
              variant="text"
              onClick={() => onClickPainel(painel, painelAtivo, setPainelAtivo)}
              sx={{ backgroundImage: `url(${painel.urlMiniatura})` }}
              className={'painel' + (painelAtivo === painel.id ? '' : ' comprimido')}
            >
              <Typography variant="h3" className="painel titulo">{painel.nome}</Typography>
              <TagAutor nome={painel.autor} />
            </Button>
            <Painel painel={painel} ativo={painelAtivo === painel.id} sx={{ marginBottom: '24px' }} />
          </Container>
        ))}
      </Stack>
    </Box>
  )
}
