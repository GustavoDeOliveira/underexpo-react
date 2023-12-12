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
 * Swagger Codegen version: 3.0.51
 *
 * Do not edit the class manually.
 *
 */
import {ApiClient} from '../ApiClient';

/**
 * The ResumoPainel model module.
 * @module model/ResumoPainel
 * @version 0.0.1
 */
export class ResumoPainel {
  /**
   * Constructs a new <code>ResumoPainel</code>.
   * @alias module:model/ResumoPainel
   * @class
   * @param nome {String} 
   * @param autor {String} 
   */
  constructor(nome, autor) {
    this.nome = nome;
    this.autor = autor;
  }

  /**
   * Constructs a <code>ResumoPainel</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResumoPainel} obj Optional instance to populate.
   * @return {module:model/ResumoPainel} The populated <code>ResumoPainel</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ResumoPainel();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('nome'))
        obj.nome = ApiClient.convertToType(data['nome'], 'String');
      if (data.hasOwnProperty('urlMiniatura'))
        obj.urlMiniatura = ApiClient.convertToType(data['urlMiniatura'], 'String');
      if (data.hasOwnProperty('autor'))
        obj.autor = ApiClient.convertToType(data['autor'], 'String');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
ResumoPainel.prototype.id = undefined;

/**
 * @member {String} nome
 */
ResumoPainel.prototype.nome = undefined;

/**
 * @member {String} urlMiniatura
 */
ResumoPainel.prototype.urlMiniatura = undefined;

/**
 * @member {String} autor
 */
ResumoPainel.prototype.autor = undefined;

