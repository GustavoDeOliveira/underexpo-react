import React from 'react';
import { Container, Typography } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import { ListaObras } from '../../Components/Perfil/Acervo/ListaObras';
import * as PerfilService from '../../Services/PerfilService';



export async function loader() {
  const resposta = await PerfilService.buscarAcervo(1, 10, 'todos', 'recentes');
  return { obras: resposta };
}

export const Acervo = () => {
  const [obras, setObras] = React.useState(useLoaderData().obras);

  const adicionarOuAtualizarAcervo = (obra) => {
    if (obras.find(o => obra.id)) {
      setObras(obras.map(o => o.id === obra.id ? obra : o));
    }
    setObras(obras.concat(obra));
  }

  const adicionarObra = (ev, obra) => {
    console.log("Obra: %o", obra);
    return new Promise((resolve, reject) => {
      const obraSalvaComSucesso = data => {
        if (data.fileUploadPromise) {
          data.fileUploadPromise
            .then(fileUploadResponse => {
              adicionarOuAtualizarAcervo(data.obra);
              resolve(data.obra);
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
        <ListaObras obras={obras} aoAdicionarElemento={adicionarObra} />
    </Container>
  )
}