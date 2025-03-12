import React from 'react';
import { Container, Typography } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import { ListaObras } from '../../Components/Perfil/Acervo/ListaObras';
import * as PerfilService from '../../Services/PerfilService';

const TAMANHO_PAGINA = 9;
const buscar = async (pagina, tamanho = TAMANHO_PAGINA) => {
  return await PerfilService.buscarAcervo(pagina, tamanho, 'todos', 'recentes');
}

export async function loader() {
  const resposta = await buscar(1, TAMANHO_PAGINA - 1);
  return { obras: resposta };
}

export const Acervo = () => {
  const [obras, setObras] = React.useState([{id: -1}, ...useLoaderData().obras]);
  const [carregando, setCarregando] = React.useState(false);
  const [maisParaCarregar, setMaisParaCarregar] = React.useState(obras.length === TAMANHO_PAGINA);

  const carregar = async (pagina) => {
    if (!carregando) {
      try {
        setCarregando(true);
        const novasObras = await buscar(pagina);
        setObras([...obras, ...novasObras]);
        setMaisParaCarregar(novasObras.length === TAMANHO_PAGINA);
      } finally {
        setCarregando(false);
      }
    }
  }

  const adicionarOuAtualizarAcervo = (obra) => {
    location.reload();
  }

  const adicionarObra = (ev, obra) => {
    console.log("Obra: %o", obra);
    return new Promise((resolve, reject) => {
      const obraSalvaComSucesso = data => {
        console.log('ObraSalvaComSucesso data: %o', data);
        if (data.fileUploadPromise) {
          data.fileUploadPromise
            .then(fileUploadResponse => {
              adicionarOuAtualizarAcervo(fileUploadResponse);
              resolve(fileUploadResponse);
            })
            .catch(reason => reject(reason));
        } else {
          adicionarOuAtualizarAcervo(data.obra);
          resolve(data.obra);
        };
      };
      console.log("Obra then: %o", obra);
      if (obra.id) {
        PerfilService.atualizarObra(obra.id, obra.titulo, obra.arquivo)
          .then(obraSalvaComSucesso).catch(reason => reject(reason));
      } else {
        PerfilService.adicionarObra(obra.titulo, obra.arquivo)
          .then(obraSalvaComSucesso).catch(reason => reject(reason));
      }
    });
  }

  return (
    <Container>
      <Typography variant="h2">Acervo</Typography>
      <ListaObras obras={obras} aoAdicionarElemento={adicionarObra} carregarMais={carregar} maisParaCarregar={maisParaCarregar} />
    </Container>
  )
}