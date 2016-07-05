import angular from '../../../node_modules/angular'
import ngMock from '../../../node_modules/angular-mocks'
import Schema from "schema"
import AngularSchema from "angular-schema"


describe('number tests', () => {
  'use strict';

  let module = angular.mock.module;
  let inject = angular.mock.inject;

  beforeEach(module('resource-schema'));

  let spec = {};

  beforeEach(inject(($injector) => {
    spec.schema = new Schema({
      posts: {
        required: true,
        type:     Number,
        max:      10,
        min:      3
      },
      type:  {
        type:    Number,
        choices: [2, 5]
      }
    });

    spec.$resource = $injector.get('$resource');
    spec.ResourceModel = $injector.get('ResourceModel');
    spec.$httpBackend = $injector.get('$httpBackend');
  }));


  let instance;

  beforeEach(() => {
    let model = spec.ResourceModel('https://example.org/api/test/:id', spec.schema);
    instance = new model(
      {
        posts: 5,
        type: 2
      });
  });

  describe('required', () => {

    it('Will invalidate required field for null', () => {
      var validationResults = instance.validate();
      expect(validationResults.posts).toBeDefined();
      instance.posts = null;
      validationResults = instance.validate();
      expect(validationResults.posts).not.toBeDefined();
    });

  });


});
