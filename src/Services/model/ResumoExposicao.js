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
 * The ResumoExposicao model module.
 * @module model/ResumoExposicao
 * @version 0.0.1
 */
export default class ResumoExposicao {
  /**
   * Constructs a new <code>ResumoExposicao</code>.
   * @alias module:model/ResumoExposicao
   * @class
   * @param id {Number}
   * @param nome {String} 
   * @param urlMiniatura {String} 
   * @param organizador {String} 
   */
  constructor(id, nome, urlMiniatura, organizador) {
    this.id = id;
    this.nome = nome;
    this.urlMiniatura = urlMiniatura;
    this.organizador = organizador;
  }

  /**
   * Constructs a <code>ResumoExposicao</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResumoExposicao} obj Optional instance to populate.
   * @return {module:model/ResumoExposicao} The populated <code>ResumoExposicao</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ResumoExposicao();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('nome'))
        obj.nome = ApiClient.convertToType(data['nome'], 'String');
      if (data.hasOwnProperty('descricao'))
        obj.descricao = ApiClient.convertToType(data['descricao'], 'String');
      if (data.hasOwnProperty('urlMiniatura'))
        obj.urlMiniatura = ApiClient.convertToType(data['urlMiniatura'], 'String');
      if (data.hasOwnProperty('organizador'))
        obj.organizador = ApiClient.convertToType(data['organizador'], 'String');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
ResumoExposicao.prototype.id = undefined;

/**
 * @member {String} nome
 */
ResumoExposicao.prototype.nome = undefined;

/**
 * @member {String} descricao
 */
ResumoExposicao.prototype.descricao = undefined;

/**
 * @member {String} urlMiniatura
 */
ResumoExposicao.prototype.urlMiniatura = undefined;

/**
 * @member {String} organizador
 */
ResumoExposicao.prototype.organizador = undefined;

