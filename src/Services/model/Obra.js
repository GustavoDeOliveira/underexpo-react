/*
 * Swagger UnderExpo - OpenAPI 3.0
 * Definição OpenAPI 3.0 para a API do projeto UnderExpo.
 *
 * OpenAPI spec version: 0.0.1
 * Contact: gustavo.oliveira@aluno.riogrande.ifrs.edu.br
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 3.0.63
 *
 * Do not edit the class manually.
 *
 */
import ApiClient from '../ApiClient';

/**
 * The Obra model module.
 * @module model/Obra
 * @version 0.0.1
 */
export default class Obra {
  /**
   * Constructs a new <code>Obra</code>.
   * @alias module:model/Obra
   * @class
   * @param id {Number} 
   * @param nome {String} 
   * @param tipo {module:model/Obra.TipoEnum} tipo de elemento
   * @param dataCarregamento {Date} 
   * @param url {String} 
   */
  constructor(id, nome, tipo, dataCarregamento, url) {
    this.id = id;
    this.nome = nome;
    this.tipo = tipo;
    this.dataCarregamento = dataCarregamento;
    this.url = url;
  }

  /**
   * Constructs a <code>Obra</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Obra} obj Optional instance to populate.
   * @return {module:model/Obra} The populated <code>Obra</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new Obra();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('nome'))
        obj.nome = ApiClient.convertToType(data['nome'], 'String');
      if (data.hasOwnProperty('tipo'))
        obj.tipo = ApiClient.convertToType(data['tipo'], 'String');
      if (data.hasOwnProperty('dataCarregamento'))
        obj.dataCarregamento = ApiClient.convertToType(data['dataCarregamento'], 'Date');
      if (data.hasOwnProperty('url'))
        obj.url = ApiClient.convertToType(data['url'], 'String');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
Obra.prototype.id = undefined;

/**
 * @member {String} nome
 */
Obra.prototype.nome = undefined;

/**
 * Allowed values for the <code>tipo</code> property.
 * @enum {String}
 * @readonly
 */
Obra.TipoEnum = {
  /**
   * value: "imagem"
   * @const
   */
  imagem: "imagem",

  /**
   * value: "audio"
   * @const
   */
  audio: "audio",

  /**
   * value: "video"
   * @const
   */
  video: "video"
};
/**
 * tipo de elemento
 * @member {module:model/Obra.TipoEnum} tipo
 */
Obra.prototype.tipo = undefined;

/**
 * @member {Date} dataCarregamento
 */
Obra.prototype.dataCarregamento = undefined;

/**
 * @member {String} url
 */
Obra.prototype.url = undefined;

