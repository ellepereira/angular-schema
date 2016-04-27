import Schema from 'schema'
import angular from '../node_modules/angular'
import ngResource from '../node_modules/angular-resource'


export default (function(window, angular) {
  'use strict';

  return angular
    .module('resource-schema', ['ngResource'])
    .provider('ResourceModel', ResourceModelProvider);

  function ResourceModelProvider() {

    var provider = this;
    provider.$get = ResourceModelFactory;

    ResourceModelFactory.$inject = ['$resource'];
    function ResourceModelFactory($resource) {

      /**
       * Compiles a schema into an angular $resource
       * @param schema: schema to compile
       * @param resource
       * @param values: initial values for the model
       * @returns {$resource}
       */
      function compile(schema, resource, values) {
        let obj = new resource(values);
        let store = values;

        obj.$schema = angular.copy(schema);

        for (let [key, field] of obj.$schema) {
          if (angular.isDefined(field) && angular.isDefined(field.type)) {
            setFieldAsProperty(obj, key, field);
          }
        }

        obj.validate = function() {
          return schema.validate(obj);
        };

        return obj;

        function setFieldAsProperty(obj, key, field) {
          Object.defineProperty(obj, key, {
            configurable: false,
            enumerable:   true,
            get:          () => {
              return (angular.isDefined(store[key]) ? store[key] : field.default || null);
            },
            set:          value => {
              store[key] = field.type.cast(value);
            }
          });
        }
      }

      return function ResourceModel(pUrl, pSchema) {

        let params = {};
        let schema = angular.copy(pSchema);

        for (let field in pSchema) {
          if (!pSchema.hasOwnProperty(field)) {
            continue;
          }
          params[field] = '@' + field;
        }

        let resource = $resource(pUrl, params);

        function Resource(values) {
          return compile(schema, resource, values);
        }

        Resource.prototype = Object.create(resource.prototype);
        Resource.prototype.constructor = Resource;

        angular.extend(Resource, resource);

        return Resource;

      }
    }

    return provider;
  }

}(window, angular));
