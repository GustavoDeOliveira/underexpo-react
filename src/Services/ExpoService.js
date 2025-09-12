import ExposicaoApi from "./api/ExposicaoApi";

let api;

function getApi() {
  if (!api) {
    api = new ExposicaoApi();
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

export const trocarMiniatura = (arquivo, expoId) => new Promise((resolve, reject) =>
  getApi().adicionarMiniaturaExposicao(arquivo, expoId, (err, data, res) => {
    respostaPadrao({err, data, res}, resolve, reject);
  })
);