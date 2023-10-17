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
 * Swagger Codegen version: 3.0.47
 *
 * Do not edit the class manually.
 *
 */
import {ApiClient} from '../ApiClient';

/**
 * The AtualizarObra model module.
 * @module model/AtualizarObra
 * @version 0.0.1
 */
export class AtualizarObra {
  /**
   * Constructs a new <code>AtualizarObra</code>.
   * @alias module:model/AtualizarObra
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>AtualizarObra</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AtualizarObra} obj Optional instance to populate.
   * @return {module:model/AtualizarObra} The populated <code>AtualizarObra</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new AtualizarObra();
      if (data.hasOwnProperty('nome'))
        obj.nome = ApiClient.convertToType(data['nome'], 'String');
    }
    return obj;
  }
}

/**
 * @member {String} nome
 */
AtualizarObra.prototype.nome = undefined;

