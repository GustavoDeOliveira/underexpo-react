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
import ResumoExposicao from './ResumoExposicao';

/**
 * The ResumoMeuPainel model module.
 * @module model/ResumoMeuPainel
 * @version 0.0.1
 */
export default class ResumoMeuPainel {
  /**
   * Constructs a new <code>ResumoMeuPainel</code>.
   * @alias module:model/ResumoMeuPainel
   * @class
   * @param id {Number} 
   * @param nome {String} 
   * @param autor {String} 
   */
  constructor(id, nome, autor) {
    this.id = id;
    this.nome = nome;
    this.autor = autor;
  }

  /**
   * Constructs a <code>ResumoMeuPainel</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResumoMeuPainel} obj Optional instance to populate.
   * @return {module:model/ResumoMeuPainel} The populated <code>ResumoMeuPainel</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ResumoMeuPainel();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('nome'))
        obj.nome = ApiClient.convertToType(data['nome'], 'String');
      if (data.hasOwnProperty('urlMiniatura'))
        obj.urlMiniatura = ApiClient.convertToType(data['urlMiniatura'], 'String');
      if (data.hasOwnProperty('autor'))
        obj.autor = ApiClient.convertToType(data['autor'], 'String');
      if (data.hasOwnProperty('exposicao'))
        obj.exposicao = ResumoExposicao.constructFromObject(data['exposicao']);
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
ResumoMeuPainel.prototype.id = undefined;

/**
 * @member {String} nome
 */
ResumoMeuPainel.prototype.nome = undefined;

/**
 * @member {String} urlMiniatura
 */
ResumoMeuPainel.prototype.urlMiniatura = undefined;

/**
 * @member {String} autor
 */
ResumoMeuPainel.prototype.autor = undefined;

/**
 * @member {module:model/ResumoExposicao} exposicao
 */
ResumoMeuPainel.prototype.exposicao = undefined;

