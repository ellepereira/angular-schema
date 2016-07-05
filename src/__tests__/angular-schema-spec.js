import angular from '../../node_modules/angular'
import ngMock from '../../node_modules/angular-mocks'
import Schema from "schema"
import AngularSchema from "angular-schema"


describe('angular-schema tests', () => {
  'use strict';

  let module = angular.mock.module;
  let inject = angular.mock.inject;

  beforeEach(module('resource-schema'));

  let spec = {};

  beforeEach(inject(($injector) => {
    spec.schema = new Schema({
      id:   Schema.types.ObjectId,
      name: {
        required: true,
        type:      String,
        maxlength: 10,
        minlength: 3
      },
      job: {
        type: String,
        choices: ['developer', 'designer']
      }
    });

    spec.$resource = $injector.get('$resource');
    spec.ResourceModel = $injector.get('ResourceModel');
    spec.$httpBackend = $injector.get('$httpBackend');
  }));


  it('compiles schema into a $resource', () => {
    var model = spec.ResourceModel('https://example.org/api/test/:id', spec.schema);
    var instance = new model();

    expect(instance.constructor.name).toBe('Resource');
  });

  describe('default methods', () => {

    var model;

    beforeEach(() => {
      model = spec.ResourceModel('https://example.org/api/test/:id', spec.schema);
    });

    it('model has a .get method', () => {
      model = spec.ResourceModel('https://example.org/api/test/:id', spec.schema);
      expect(model.get).toBeDefined();
    });

    it('model has a .save method', () => {
      expect(model.save).toBeDefined();
    });

    it('model has a .query method', () => {
      expect(model.query).toBeDefined();
    });

  });

  it('by default the model query will call GET on endpoint', () => {
    var model = spec.ResourceModel('https://example.org/api/test/:id', spec.schema);
    spec.$httpBackend.expectGET('https://example.org/api/test').respond(200);
    expect(model).toBeDefined();
    model.query();
    spec.$httpBackend.flush();
  });

});
