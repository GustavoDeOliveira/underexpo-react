import './cartao.css';
import { Box } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { TextoResumido } from '../Geral/TextoResumido';

export const CartaoConteudo = ({ nome, descricao }) => {
  return (
    <Box className="cartao conteudo" color="primary">
      <CardContent>
        <TextoResumido texto={nome} props={{gutterBottom: true, variant: "h5", component: "h2", className: "titulo"}} />
        <TextoResumido texto={descricao} props={{className: "descricao"}} />
      </CardContent>
    </Box>
  );
}