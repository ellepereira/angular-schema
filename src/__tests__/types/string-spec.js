import angular from '../../../node_modules/angular'
import ngMock from '../../../node_modules/angular-mocks'
import Schema from "schema"
import AngularSchema from "angular-schema"


describe('angular-schema string tests', () => {
  'use strict';

  let module = angular.mock.module;
  let inject = angular.mock.inject;

  beforeEach(module('resource-schema'));

  let spec = {};

  beforeEach(inject(($injector) => {
    spec.schema = new Schema({
      name: {
        required: true,
        type:      String,
        maxlength: 10,
        minlength: 3
      }
    });

    spec.$resource = $injector.get('$resource');
    spec.ResourceModel = $injector.get('ResourceModel');
    spec.$httpBackend = $injector.get('$httpBackend');
  }));


  describe('string fields', () => {

    let instance;

    beforeEach(() => {
      let model = spec.ResourceModel('https://example.org/api/test/:id', spec.schema);
      instance = new model({name: 'luciano'});
    });

    describe('required', () => {

      it('Will validate required field', () => {
        var validationResults = instance.validate();
        expect(validationResults.name).not.toBeDefined();
        instance.name = null;
        validationResults = instance.validate();
        expect(validationResults.name).toBeDefined();
      });

      it('Will validate required field', () => {
        var validationResults = instance.validate();
        expect(validationResults.name).not.toBeDefined();
        instance.name = ' ';
        validationResults = instance.validate();
        expect(validationResults.name).toBeDefined();
      });

      it('emptry strings does not meet required field need', () => {
        var validationResults = instance.validate();
        expect(validationResults.name).not.toBeDefined();
        instance.name = '';
        validationResults = instance.validate();
        expect(validationResults.name).toBeDefined();
      });
    });

    describe('maxlength', () => {
      it('Will validate max length', () => {
        var validationResults = instance.validate();
        expect(validationResults.name).not.toBeDefined();
        instance.name = 'Longer and therefore invalid name';
        validationResults = instance.validate();
        console.log(validationResults);
        expect(validationResults.name).toBeDefined();
      });
    });

    describe('maxlength', () => {
      it('Will validate max length', () => {
        var validationResults = instance.validate();
        expect(validationResults.name).not.toBeDefined();
        instance.name = 'Longer and therefore invalid name';
        validationResults = instance.validate();
        expect(validationResults.name).toBeDefined();
      });
    });

    describe('minlength', () => {
      it('Will validate min length', () => {
        var validationResults = instance.validate();
        expect(validationResults.name).not.toBeDefined();
        instance.name = 'Shorter';
        validationResults = instance.validate();
        expect(validationResults.name).not.toBeDefined();
        instance.name = 'hi';
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

});
