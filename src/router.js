import { createBrowserRouter } from "react-router-dom";
import { Base } from './Pages/Base';
import { Erro } from './Pages/Erro';
import { Exposicoes } from './Pages/Exposicoes';
import { Explorar, loader as explorarLoader } from './Pages/Exposicoes/Explorar';
import { Exposicao, loader as exposicaoLoader } from './Pages/Exposicoes/Exposicao';
import { EditarExposicao, loader as editarExposicaoLoader } from "./Pages/Exposicoes/EditarExposicao";
import { GerenciarExposicoes, loader as gerenciarExposicoesLoader } from './Pages/Exposicoes/GerenciarExposicoes';
import { Perfil } from './Pages/Perfil';
import { Contato, loader as contatoLoader } from "./Pages/Perfil/Contato";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Base />,
      errorElement: <Erro />,
      children: [
        {
          path: "exposicoes",
          element: <Exposicoes />,
          children: [
            {
              path: "explorar",
              index: true,
              loader: explorarLoader,
              element: <Explorar />
            },
            {
              path: "gerenciar",
              loader: gerenciarExposicoesLoader,
              element: <GerenciarExposicoes />
            },
            {
              path: ":idExposicao",
              loader: exposicaoLoader,
              element: <Exposicao />
            },
            {
              path: ":idExposicao/editar",
              loader: editarExposicaoLoader,
              element: <EditarExposicao />
            }
          ]
        },
        {
          path: "perfil",
          element: <Perfil />,
          children: [
            {
              path: "contato",
              index: true,
              loader: contatoLoader,
              element: <Contato />
            }
          ]
        }
      ],
    },
  ]);

export default router;