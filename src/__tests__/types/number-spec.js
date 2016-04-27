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
        type:     String,
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
    instance = new model({posts: 5});
  });

  describe('required', () => {

    it('Will invalidate required field for null', () => {
      var validationResults = instance.validate();
      expect(validationResults.posts).not.toBeDefined();
      instance.posts = null;
      validationResults = instance.validate();
      expect(validationResults.posts).toBeDefined();
    });

    it('Will invalidate required for empty string', () => {
      var validationResults = instance.validate();
      expect(validationResults.name).not.toBeDefined();
      instance.name = ' ';
      validationResults = instance.validate();
      expect(validationResults.name).toBeDefined();
    });

    it('0 meets required demands', () => {
      var validationResults = instance.validate();
      expect(validationResults.name).not.toBeDefined();
      instance.name = 0;
      validationResults = instance.validate();
      expect(validationResults.name).toBeDefined();
    });
  });

  describe('max', () => {
    it('Will validate max length', () => {
      var validationResults = instance.validate();
      expect(validationResults.name).not.toBeDefined();
      instance.name = 'Longer and therefore invalid name';
      validationResults = instance.validate();
      expect(validationResults.name).toBeDefined();
    });
  });

  describe('min', () => {
    it('Will validate max length', () => {
      var validationResults = instance.validate();
      expect(validationResults.name).not.toBeDefined();
      instance.name = 'Longer and therefore invalid name';
      validationResults = instance.validate();
      expect(validationResults.name).toBeDefined();
    });
  });

  describe('choices', () => {
    it('Will validate choices', () => {
      var validationResults = instance.validate();
      expect(validationResults.job).not.toBeDefined();

      instance.job = 'designer';
      validationResults = instance.validate();
      expect(validationResults.job).not.toBeDefined();

      instance.job = 'business';
      validationResults = instance.validate();
      expect(validationResults.job).toBeDefined();
    });
  });


});
