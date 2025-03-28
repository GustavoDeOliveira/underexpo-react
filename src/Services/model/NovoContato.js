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
 * The NovoContato model module.
 * @module model/NovoContato
 * @version 0.0.1
 */
export default class NovoContato {
  /**
   * Constructs a new <code>NovoContato</code>.
   * @alias module:model/NovoContato
   * @class
   * @param canal {String} 
   * @param nome {String} 
   * @param link {String} 
   */
  constructor(canal, nome, link) {
    this.canal = canal;
    this.nome = nome;
    this.link = link;
  }

  /**
   * Constructs a <code>NovoContato</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/NovoContato} obj Optional instance to populate.
   * @return {module:model/NovoContato} The populated <code>NovoContato</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new NovoContato();
      if (data.hasOwnProperty('canal'))
        obj.canal = ApiClient.convertToType(data['canal'], 'String');
      if (data.hasOwnProperty('nome'))
        obj.nome = ApiClient.convertToType(data['nome'], 'String');
      if (data.hasOwnProperty('link'))
        obj.link = ApiClient.convertToType(data['link'], 'String');
    }
    return obj;
  }
}

/**
 * @member {String} canal
 */
NovoContato.prototype.canal = undefined;

/**
 * @member {String} nome
 */
NovoContato.prototype.nome = undefined;

/**
 * @member {String} link
 */
NovoContato.prototype.link = undefined;

