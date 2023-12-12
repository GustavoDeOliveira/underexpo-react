import { createBrowserRouter } from "react-router-dom";
import { Base } from './Pages/Base';
import { Erro } from './Pages/Erro';
import { Explorar, loader as explorarLoader } from './Pages/Explorar';
import { Exposicao, loader as exposicaoLoader } from './Pages/Exposicao';
import Exposicoes from './Pages/Exposicoes';
import { GerenciarExposicoes, loader as gerenciarExposicoesLoader } from './Pages/GerenciarExposicoes';
import { Perfil } from './Pages/Perfil';
import { EditarExposicao, loader as editarExposicaoLoader } from "./Pages/EditarExposicao";

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
          element: <Perfil />
        }
      ],
    },
  ]);

export default router;