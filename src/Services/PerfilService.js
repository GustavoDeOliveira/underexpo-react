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

const buscarContatosDoUsuarioAtual = async () => {
  return new Promise((resolve, reject) => {
    getApi().buscarContatos(1, 100, (err, data, res) => {
      respostaPadrao({ err, data, res }, resolve, reject);
    });
  });
};

const adicionarContato = async (canal, nome, link) => {
  return new Promise((resolve, reject) => {
    getApi().adicionarContato({ body: {canal, nome, link}}, (err, data, res) => {
      respostaPadrao({ err, data, res }, resolve, reject);
    });
  });
};

const atualizarContato = async (id, canal, nome, link) => {
  return new Promise((resolve, reject) => {
    getApi().atualizarContato(id, { body: {canal, nome, link} }, (err, data, res) => {
      respostaPadrao({ err, data, res }, resolve, reject);
    });
  });
}

const removerContato = async (id) => {
  return new Promise((resolve, reject) => {
    getApi().removerContato(id, (err, data, res) => {
      respostaPadrao({ err, data, res }, resolve, reject);
    });
  });
}

export const PerfilService = {
  buscarContatosDoUsuarioAtual,
  adicionarContato,
  atualizarContato,
  removerContato
}