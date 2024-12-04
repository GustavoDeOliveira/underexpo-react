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
 * The NovaObra model module.
 * @module model/NovaObra
 * @version 0.0.1
 */
export default class NovaObra {
  /**
   * Constructs a new <code>NovaObra</code>.
   * @alias module:model/NovaObra
   * @class
   * @param nome {String} 
   * @param tipo {module:model/NovaObra.TipoEnum} tipo de elemento
   */
  constructor(nome, tipo) {
    this.nome = nome;
    this.tipo = tipo;
  }

  /**
   * Constructs a <code>NovaObra</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/NovaObra} obj Optional instance to populate.
   * @return {module:model/NovaObra} The populated <code>NovaObra</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new NovaObra();
      if (data.hasOwnProperty('nome'))
        obj.nome = ApiClient.convertToType(data['nome'], 'String');
      if (data.hasOwnProperty('tipo'))
        obj.tipo = ApiClient.convertToType(data['tipo'], 'String');
    }
    return obj;
  }
}

/**
 * @member {String} nome
 */
NovaObra.prototype.nome = undefined;

/**
 * Allowed values for the <code>tipo</code> property.
 * @enum {String}
 * @readonly
 */
NovaObra.TipoEnum = {
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
 * @member {module:model/NovaObra.TipoEnum} tipo
 */
NovaObra.prototype.tipo = undefined;

