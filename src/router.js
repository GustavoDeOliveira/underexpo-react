import { createBrowserRouter } from "react-router-dom";
import { Base } from './Pages/Base';
import { Erro } from './Pages/Erro';
import Header from './Components/Header';
import { Exposicoes } from './Pages/Exposicoes';
import { Explorar, loader as explorarLoader } from './Pages/Exposicoes/Explorar';
import { Exposicao, loader as exposicaoLoader } from './Pages/Exposicoes/Exposicao';
import { EditarExposicao, loader as editarExposicaoLoader } from "./Pages/Exposicoes/EditarExposicao";
import { GerenciarExposicoes, loader as gerenciarExposicoesLoader } from './Pages/Exposicoes/GerenciarExposicoes';
import { Perfil } from './Pages/Perfil';
import { Contato, loader as contatoLoader } from "./Pages/Perfil/Contato";
import { Acervo, loader as acervoLoader } from "./Pages/Perfil/Acervo";
import { GerenciarPaineis, loader as gerenciarPaineisLoader } from "./Pages/Exposicoes/GerenciarPaineis";
import { EditarPainel, loader as editarPainelLoader } from "./Pages/Exposicoes/EditarPainel";

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
              path: "",
              loader: explorarLoader,
              element: <Explorar />
            },
            {
              path: "gerenciar",
              loader: gerenciarExposicoesLoader,
              element: <GerenciarExposicoes />
            },
            {
              path: "paineis",
              loader: gerenciarPaineisLoader,
              element: <GerenciarPaineis />
            },
            {
              path: ":idExposicao/paineis/:idPainel/editar",
              loader: editarPainelLoader,
              element: <EditarPainel />
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
            },
            {
              path: "acervo",
              loader: acervoLoader,
              element: <Acervo />
            }
          ]
        }
      ],
    },
  ]);

export default router;