import UsuarioApi from "./api/UsuarioApi";

let api;

function getApi() {
  if (!api) {
    api = new UsuarioApi();
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

export const criarUsuario = async (chave, nome) => {
  return new Promise((resolve, reject) => {
    getApi().criarUsuario({body: {chave, nome}}, (err, data, res) => {
      respostaPadrao({ err, data, res }, resolve, reject);
    });
  });
};

export const buscarUsuario = async (chave) => {
  return new Promise((resolve, reject) => {
    getApi().obterUsuario(chave, (err, data, res) => {
      respostaPadrao({ err, data, res }, resolve, reject);
    });
  });
};