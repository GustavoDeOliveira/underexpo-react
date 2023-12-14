import { PerfilApi } from "./api/PerfilApi";

let api;

function getApi() {
  if (!api) {
    api = new PerfilApi();
  }
  return api;
}

function respostaPadrao(response, resolve, reject) {
  if (response.err) {
    console.log('error: %o', response.err);
    reject(response.err);
  }
  else {
    console.log('data: %o', response.data);
    resolve(response.data);
  }
}

export const buscarContatosDoUsuarioAtual = async () => {
  return new Promise((resolve, reject) => {
    getApi().buscarContatos(1, 100, (err, data, res) => {
      respostaPadrao({ err, data, res }, resolve, reject);
    });
  });
};

export const adicionarContato = async (novoContato) => {
  return new Promise((resolve, reject) => {
    getApi().adicionarContato({ body: novoContato }, (err, data, res) => {
      respostaPadrao({ err, data, res }, resolve, reject);
    });
  });
};