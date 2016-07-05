import SchemaType from 'schematype'
import {CastError} from 'errors'

export class StringSchemaType extends SchemaType {

  constructor(field, options) {

    super(field, options);

    if (options.minlength) {
      this.validators.set('min', this.minValidate);
    }

    if (options.maxlength) {
      this.validators.set('max', this.maxValidate);
    }

    if (options.choices) {
      this.validators.set('choices', this.choicesValidate);
    }
  }

  cast(value) {
    return value.toString();
  }

  minValidate(value) {
    if (value && value.length < this.options.minlength) {
      return `invalid value: ${value} is less than minimal length ${this.options.minlength}`;
    }
  }

  maxValidate(value) {
    if (value && value.length > this.options.maxlength) {
      return `invalid value: ${value} is more than maximum length ${this.options.maxlength}`;
    }
  }

  choicesValidate(value) {
    let choices = this.options.choices;
    if (choices.indexOf(value) === -1) {
      return `invalid value: ${value}`;
    }
  }

  checkRequired(value) {
    if (!value || value.length < 1) {
      return `${this.field.name} is required`;
    }
  }
}
