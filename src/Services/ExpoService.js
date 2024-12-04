import { ExposicaoApi } from "./api/ExposicaoApi";

let api;

function getApi() {
  if (!api) {
    api = new ExposicaoApi();
  }
  return api;
}