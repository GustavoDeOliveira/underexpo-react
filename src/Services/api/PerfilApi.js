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
import {ApiClient} from "../ApiClient";
import {AtualizarObra} from '../model/AtualizarObra';
import {ConviteExposicao} from '../model/ConviteExposicao';
import {Notificacao} from '../model/Notificacao';
import {NovaNotificacao} from '../model/NovaNotificacao';
import {NovaObra} from '../model/NovaObra';
import {Obra} from '../model/Obra';
import {Perfil} from '../model/Perfil';
import {ResumoExposicao} from '../model/ResumoExposicao';
import {ResumoMeuPainel} from '../model/ResumoMeuPainel';

/**
* Perfil service.
* @module api/PerfilApi
* @version 0.0.1
*/
export class PerfilApi {

    /**
    * Constructs a new PerfilApi. 
    * @alias module:api/PerfilApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }

    /**
     * Callback function to receive the result of the aceitarConviteNotificacao operation.
     * @callback moduleapi/PerfilApi~aceitarConviteNotificacaoCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Aceitar um convite para exposição a partir de uma notificação
     * Aceita um convite para participar em um painel de uma exposição
     * @param {Number} id id da notificação
     * @param {module:api/PerfilApi~aceitarConviteNotificacaoCallback} callback The callback function, accepting three arguments: error, data, response
     */
    aceitarConviteNotificacao(id, callback) {
      
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling aceitarConviteNotificacao");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['underexpo_auth'];
      let contentTypes = [];
      let accepts = [];
      let returnType = null;

      return this.apiClient.callApi(
        '/perfil/notificacao/{id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the adicionarArquivoObra operation.
     * @callback moduleapi/PerfilApi~adicionarArquivoObraCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Adicionar um arquivo a uma obra
     * Carrega um novo arquivo para uma obra
     * @param {Object} body Arquivo que será carregado na obra.
Deve ser de um formato suportado pelo tipo da obra
     * @param {Number} id ID da obra a qual o arquivo pertencerá
     * @param {module:api/PerfilApi~adicionarArquivoObraCallback} callback The callback function, accepting three arguments: error, data, response
     */
    adicionarArquivoObra(body, id, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling adicionarArquivoObra");
      }
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling adicionarArquivoObra");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['underexpo_auth'];
      let contentTypes = ['image/png', 'image/jpeg', 'audio/mp3', 'audio/wav'];
      let accepts = [];
      let returnType = null;

      return this.apiClient.callApi(
        '/perfil/acervo/obra/{id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the adicionarContato operation.
     * @callback moduleapi/PerfilApi~adicionarContatoCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Adicionar canal de contato ao perfil do usuario
     * Adiciona um canal de contato ao perfil da conta da sessão atual
     * @param {Object} opts Optional parameters
     * @param {module:model/NovaNotificacao} opts.body Dados de contato a serem cadastrados.
     * @param {Number} opts.expoId 
     * @param {Number} opts.painelId 
     * @param {String} opts.artista 
     * @param {module:api/PerfilApi~adicionarContatoCallback} callback The callback function, accepting three arguments: error, data, response
     */
    adicionarContato(opts, callback) {
      opts = opts || {};
      let postBody = opts['body'];

      let pathParams = {
        
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        'expoId': opts['expoId'],'painelId': opts['painelId'],'artista': opts['artista']
      };

      let authNames = ['underexpo_auth'];
      let contentTypes = ['application/json', 'application/xml', 'application/x-www-form-urlencoded'];
      let accepts = [];
      let returnType = null;

      return this.apiClient.callApi(
        '/perfil/contato', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the adicionarObra operation.
     * @callback moduleapi/PerfilApi~adicionarObraCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Carregar obra no acervo do usuário
     * Adiciona uma obra ao acervo do usuário.
     * @param {Object} opts Optional parameters
     * @param {module:model/NovaObra} opts.body Dados da obra a ser carregada no acervo.
     * @param {String} opts.nome 
     * @param {module:model/String} opts.tipo 
     * @param {module:api/PerfilApi~adicionarObraCallback} callback The callback function, accepting three arguments: error, data, response
     */
    adicionarObra(opts, callback) {
      opts = opts || {};
      let postBody = opts['body'];

      let pathParams = {
        
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        'nome': opts['nome'],'tipo': opts['tipo']
      };

      let authNames = ['underexpo_auth'];
      let contentTypes = ['application/json', 'application/xml', 'application/x-www-form-urlencoded'];
      let accepts = [];
      let returnType = null;

      return this.apiClient.callApi(
        '/perfil/acervo/obra', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the atualizarContato operation.
     * @callback moduleapi/PerfilApi~atualizarContatoCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Atualizar canal de contato
     * Atualiza um canal de contato
     * @param {Number} id id do contato
     * @param {module:api/PerfilApi~atualizarContatoCallback} callback The callback function, accepting three arguments: error, data, response
     */
    atualizarContato(id, callback) {
      
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling atualizarContato");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['underexpo_auth'];
      let contentTypes = [];
      let accepts = [];
      let returnType = null;

      return this.apiClient.callApi(
        '/perfil/contato/{id}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the atualizarObra operation.
     * @callback moduleapi/PerfilApi~atualizarObraCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AtualizarObra{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Editar obra do acervo do usuário
     * Edita uma obra do acervo do usuário.
     * @param {Number} id ID da obra a ser atualizada
     * @param {module:api/PerfilApi~atualizarObraCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    atualizarObra(id, callback) {
      
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling atualizarObra");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['underexpo_auth'];
      let contentTypes = [];
      let accepts = ['application/json', 'application/xml'];
      let returnType = AtualizarObra;

      return this.apiClient.callApi(
        '/perfil/acervo/obra/{id}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the buscarContatoPorId operation.
     * @callback moduleapi/PerfilApi~buscarContatoPorIdCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Notificacao{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Buscar um canal de contato a partir do id
     * Busca um canal de contato de um artista
     * @param {Number} id id da notificação
     * @param {module:api/PerfilApi~buscarContatoPorIdCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    buscarContatoPorId(id, callback) {
      
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling buscarContatoPorId");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['underexpo_auth'];
      let contentTypes = [];
      let accepts = ['application/json', 'application/xml'];
      let returnType = Notificacao;

      return this.apiClient.callApi(
        '/perfil/contato/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the buscarContatos operation.
     * @callback moduleapi/PerfilApi~buscarContatosCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Notificacao>{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Buscar canais de contato de um usuário
     * Busca os canais de contato de um usuario a partir do seu nome
     * @param {Number} pagina Página atual da busca
     * @param {Number} quantidade Quantidade de registros a serem buscados
     * @param {module:api/PerfilApi~buscarContatosCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    buscarContatos(pagina, quantidade, callback) {
      
      let postBody = null;
      // verify the required parameter 'pagina' is set
      if (pagina === undefined || pagina === null) {
        throw new Error("Missing the required parameter 'pagina' when calling buscarContatos");
      }
      // verify the required parameter 'quantidade' is set
      if (quantidade === undefined || quantidade === null) {
        throw new Error("Missing the required parameter 'quantidade' when calling buscarContatos");
      }

      let pathParams = {
        
      };
      let queryParams = {
        'pagina': pagina,'quantidade': quantidade
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['underexpo_auth'];
      let contentTypes = [];
      let accepts = ['application/json', 'application/xml'];
      let returnType = [Notificacao];

      return this.apiClient.callApi(
        '/perfil/contato', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the buscarNotificacaoPorId operation.
     * @callback moduleapi/PerfilApi~buscarNotificacaoPorIdCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Notificacao{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Buscar uma notificação a partir do id
     * Busca uma notificação de convite para participação em uma exposição
     * @param {Number} id id da notificação
     * @param {module:api/PerfilApi~buscarNotificacaoPorIdCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    buscarNotificacaoPorId(id, callback) {
      
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling buscarNotificacaoPorId");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['underexpo_auth'];
      let contentTypes = [];
      let accepts = ['application/json', 'application/xml'];
      let returnType = Notificacao;

      return this.apiClient.callApi(
        '/perfil/notificacao/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the buscarNotificacoes operation.
     * @callback moduleapi/PerfilApi~buscarNotificacoesCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Notificacao>{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Buscar notificações para o usuário ativo
     * Busca notificações de convites para participação em exposições
     * @param {Number} pagina Página atual da busca
     * @param {Number} quantidade Quantidade de registros a serem buscados
     * @param {module:api/PerfilApi~buscarNotificacoesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    buscarNotificacoes(pagina, quantidade, callback) {
      
      let postBody = null;
      // verify the required parameter 'pagina' is set
      if (pagina === undefined || pagina === null) {
        throw new Error("Missing the required parameter 'pagina' when calling buscarNotificacoes");
      }
      // verify the required parameter 'quantidade' is set
      if (quantidade === undefined || quantidade === null) {
        throw new Error("Missing the required parameter 'quantidade' when calling buscarNotificacoes");
      }

      let pathParams = {
        
      };
      let queryParams = {
        'pagina': pagina,'quantidade': quantidade
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['underexpo_auth'];
      let contentTypes = [];
      let accepts = ['application/json', 'application/xml'];
      let returnType = [Notificacao];

      return this.apiClient.callApi(
        '/perfil/notificacao', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the buscarPerfis operation.
     * @callback moduleapi/PerfilApi~buscarPerfisCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Perfil>{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Buscar perfis cadastrados na plataforma a partir de uma palavra-chave
     * Busca perfis de usuários cadastrados na plataforma que coincidam com a palavra-chave informada.
     * @param {String} chave A palavra-chave para filtrar os resultados da busca
     * @param {module:api/PerfilApi~buscarPerfisCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    buscarPerfis(chave, callback) {
      
      let postBody = null;
      // verify the required parameter 'chave' is set
      if (chave === undefined || chave === null) {
        throw new Error("Missing the required parameter 'chave' when calling buscarPerfis");
      }

      let pathParams = {
        
      };
      let queryParams = {
        'chave': chave
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['application/json', 'application/xml'];
      let returnType = [Perfil];

      return this.apiClient.callApi(
        '/perfil', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the carregarMeusPaineis operation.
     * @callback moduleapi/PerfilApi~carregarMeusPaineisCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ResumoMeuPainel>{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Carregar painéis mantidos pelo usuário
     * Carrega os painéis de exposições que o usuário aceitou participar.
     * @param {module:api/PerfilApi~carregarMeusPaineisCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    carregarMeusPaineis(callback) {
      
      let postBody = null;

      let pathParams = {
        
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['underexpo_auth'];
      let contentTypes = [];
      let accepts = ['application/json', 'application/xml'];
      let returnType = [ResumoMeuPainel];

      return this.apiClient.callApi(
        '/perfil/painel', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the carregarMinhasExposicoes operation.
     * @callback moduleapi/PerfilApi~carregarMinhasExposicoesCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ResumoExposicao>{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Carregar exposições organizadas pelo usuário
     * Carrega as exposições que o usuário organizou.
     * @param {module:api/PerfilApi~carregarMinhasExposicoesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    carregarMinhasExposicoes(callback) {
      
      let postBody = null;

      let pathParams = {
        
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['underexpo_auth'];
      let contentTypes = [];
      let accepts = ['application/json', 'application/xml'];
      let returnType = [ResumoExposicao];

      return this.apiClient.callApi(
        '/perfil/expo', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the carregarObra operation.
     * @callback moduleapi/PerfilApi~carregarObraCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Obra{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Carregar obra do acervo do usuário
     * Carrega uma obra do acervo do usuário.
     * @param {Number} id ID da obra a ser carregada
     * @param {module:api/PerfilApi~carregarObraCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    carregarObra(id, callback) {
      
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling carregarObra");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['underexpo_auth'];
      let contentTypes = [];
      let accepts = ['application/json', 'application/xml'];
      let returnType = Obra;

      return this.apiClient.callApi(
        '/perfil/acervo/obra/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the carregarObras operation.
     * @callback moduleapi/PerfilApi~carregarObrasCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Obra>{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Listar obras no acervo do usuário
     * Lista as obras no acervo do usuário.
     * @param {Number} pagina Página atual da busca
     * @param {Number} quantidade Quantidade de registros a serem buscados
     * @param {Object} opts Optional parameters
     * @param {module:model/String} opts.tipo Tipo de filtro para aplicar na busca (default to <.>)
     * @param {module:model/String} opts.ordenacao Tipo de ordenacao para aplicar na busca (default to <.>)
     * @param {module:api/PerfilApi~carregarObrasCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    carregarObras(pagina, quantidade, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'pagina' is set
      if (pagina === undefined || pagina === null) {
        throw new Error("Missing the required parameter 'pagina' when calling carregarObras");
      }
      // verify the required parameter 'quantidade' is set
      if (quantidade === undefined || quantidade === null) {
        throw new Error("Missing the required parameter 'quantidade' when calling carregarObras");
      }

      let pathParams = {
        
      };
      let queryParams = {
        'pagina': pagina,'quantidade': quantidade,'tipo': opts['tipo'],'ordenacao': opts['ordenacao']
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['underexpo_auth'];
      let contentTypes = [];
      let accepts = ['application/json', 'application/xml'];
      let returnType = [Obra];

      return this.apiClient.callApi(
        '/perfil/acervo/obra', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the enviarNotificacao operation.
     * @callback moduleapi/PerfilApi~enviarNotificacaoCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ConviteExposicao{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Enviar uma notificação convidando um usuário para uma exposição
     * Envia um convite para participação em uma exposição
     * @param {Object} opts Optional parameters
     * @param {module:model/NovaNotificacao} opts.body Dados da exposição, painel e artista que será convidado.
     * @param {Number} opts.expoId 
     * @param {Number} opts.painelId 
     * @param {String} opts.artista 
     * @param {module:api/PerfilApi~enviarNotificacaoCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    enviarNotificacao(opts, callback) {
      opts = opts || {};
      let postBody = opts['body'];

      let pathParams = {
        
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        'expoId': opts['expoId'],'painelId': opts['painelId'],'artista': opts['artista']
      };

      let authNames = ['underexpo_auth'];
      let contentTypes = ['application/json', 'application/xml', 'application/x-www-form-urlencoded'];
      let accepts = ['application/json', 'application/xml'];
      let returnType = ConviteExposicao;

      return this.apiClient.callApi(
        '/perfil/notificacao', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the removerContato operation.
     * @callback moduleapi/PerfilApi~removerContatoCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Remover canal de contato
     * Remove um canal de contato
     * @param {Number} id id do contato
     * @param {module:api/PerfilApi~removerContatoCallback} callback The callback function, accepting three arguments: error, data, response
     */
    removerContato(id, callback) {
      
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling removerContato");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['underexpo_auth'];
      let contentTypes = [];
      let accepts = [];
      let returnType = null;

      return this.apiClient.callApi(
        '/perfil/contato/{id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the removerNotificacao operation.
     * @callback moduleapi/PerfilApi~removerNotificacaoCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Cancelar convite para exposição
     * Cancela um convite para uma exposição
     * @param {Number} id id do contato
     * @param {module:api/PerfilApi~removerNotificacaoCallback} callback The callback function, accepting three arguments: error, data, response
     */
    removerNotificacao(id, callback) {
      
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling removerNotificacao");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['underexpo_auth'];
      let contentTypes = [];
      let accepts = [];
      let returnType = null;

      return this.apiClient.callApi(
        '/perfil/notificacao/{id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the removerObra operation.
     * @callback moduleapi/PerfilApi~removerObraCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Remover uma obra do acervo do usuário
     * Remove uma obra do acervo do usuário. Também remove o arquivo da obra do servidor, se houver.
     * @param {Number} id ID da obra a ser removida
     * @param {module:api/PerfilApi~removerObraCallback} callback The callback function, accepting three arguments: error, data, response
     */
    removerObra(id, callback) {
      
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling removerObra");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['underexpo_auth'];
      let contentTypes = [];
      let accepts = [];
      let returnType = null;

      return this.apiClient.callApi(
        '/perfil/acervo/obra/{id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

}