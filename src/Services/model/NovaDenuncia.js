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
 * The NovaDenuncia model module.
 * @module model/NovaDenuncia
 * @version 0.0.1
 */
export default class NovaDenuncia {
  /**
   * Constructs a new <code>NovaDenuncia</code>.
   * @alias module:model/NovaDenuncia
   * @class
   * @param descricao {String} 
   */
  constructor(descricao) {
    this.descricao = descricao;
  }

  /**
   * Constructs a <code>NovaDenuncia</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/NovaDenuncia} obj Optional instance to populate.
   * @return {module:model/NovaDenuncia} The populated <code>NovaDenuncia</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new NovaDenuncia();
      if (data.hasOwnProperty('descricao'))
        obj.descricao = ApiClient.convertToType(data['descricao'], 'String');
    }
    return obj;
  }
}

/**
 * @member {String} descricao
 */
NovaDenuncia.prototype.descricao = undefined;

