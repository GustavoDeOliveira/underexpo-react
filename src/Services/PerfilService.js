import PerfilApi from "./api/PerfilApi";

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

export const adicionarContato = async (canal, nome, link) => {
  return new Promise((resolve, reject) => {
    getApi().adicionarContato({ body: {canal, nome, link}}, (err, data, res) => {
      respostaPadrao({ err, data, res }, resolve, reject);
    });
  });
};

export const atualizarContato = async (id, canal, nome, link) => {
  return new Promise((resolve, reject) => {
    getApi().atualizarContato(id, { body: {canal, nome, link} }, (err, data, res) => {
      respostaPadrao({ err, data, res }, resolve, reject);
    });
  });
};

export const removerContato = async (id) => {
  return new Promise((resolve, reject) => {
    getApi().removerContato(id, (err, data, res) => {
      respostaPadrao({ err, data, res }, resolve, reject);
    });
  });
};

export const buscarAcervo = async (pagina, tamanhoPagina, filtros, ordenacao) => {
  return new Promise((resolve, reject) => {
    getApi().carregarObras(pagina, tamanhoPagina, { tipo: filtros, ordenacao: ordenacao}, (err, data, res) => {
      respostaPadrao({ err, data, res }, resolve, reject);
    });
  });
}

export const adicionarObra = async (titulo, arquivo) => {
  const tipo = arquivo.type.includes('image') ? 'imagem' : arquivo.type.includes('audio') ? 'audio' : '';
  return new Promise((resolve, reject) => {
    getApi().adicionarObra({body: { nome: titulo, tipo: tipo}, nome: titulo, tipo: tipo}, (err, data, res) => {
      if (err) {
        console.log('error: %o', err);
        reject(err);
      }
      else {
        console.log('data: %o', data);
        resolve({obra: data, fileUploadPromise: new Promise((resolve, reject) => {
          getApi().adicionarArquivoObra(arquivo, data.id, (err, data, res) => {
            respostaPadrao({err, data, res}, resolve, reject);
          });
        })})
      }
    });
  });
}

export const atualizarObra = async (id, titulo, arquivo) => {
  console.log("Request: %d, %s, %o", id, titulo, arquivo);
  const tipo = arquivo ? arquivo.type.includes('image') ? 'imagem' : arquivo.type.includes('audio') ? 'audio' : undefined : undefined;
  return new Promise((resolve, reject) => {
    getApi().atualizarObra(id, {body: {nome: titulo}}, (err, data, res) => {
      if (err) {
        console.log('error: %o', err);
        reject(err);
      }
      else {
        console.log('data: %o', data);
        if (arquivo) {
          resolve({obra: data, fileUploadPromise: new Promise((resolve, reject) => {
            getApi().adicionarArquivoObra(arquivo, id, (err, data, res) => {
              respostaPadrao({err, data, res}, resolve, reject);
            });
          })})
        } else {
          resolve({obra: data});
        }
      }
    });
  });
}