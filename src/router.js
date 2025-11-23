import { createBrowserRouter } from "react-router-dom";
import { Base } from './Pages/Base';
import { Erro } from './Pages/Erro';
import { Explorar, loader as explorarLoader } from './Pages/Exposicoes/Explorar';
import { Exposicao, loader as exposicaoLoader } from './Pages/Exposicoes/Exposicao';
import { EditarExposicao, loader as editarExposicaoLoader } from "./Pages/Exposicoes/EditarExposicao";
import { GerenciarExposicoes, loader as gerenciarExposicoesLoader } from './Pages/Exposicoes/GerenciarExposicoes';
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
          name: "Exposições",
          navBar: true,
          children: [
            {
              path: "",
              name: "Explorar",
              index: true,
              navBar: true,
              loader: explorarLoader,
              element: <Explorar />
            },
            {
              path: "gerenciar",
              name: "Gerenciar Exposições",
              navBar: true,
              loader: gerenciarExposicoesLoader,
              element: <GerenciarExposicoes />
            },
            {
              path: "paineis",
              name: "Gerenciar Painéis",
              navBar: true,
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
          name: "Perfil",
          navBar: true,
          children: [
            {
              path: "contato",
              name: "Contato",
              index: true,
              navBar: true,
              loader: contatoLoader,
              element: <Contato />
            },
            {
              path: "acervo",
              name: "Acervo",
              navBar: true,
              loader: acervoLoader,
              element: <Acervo />
            }
          ]
        }
      ],
    },
  ]);

export default router;