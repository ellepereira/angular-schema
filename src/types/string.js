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
    return this.isEmpty(value) || value.length >= this.options.minlength;
  }

  maxValidate(value) {
    return this.isEmpty(value) || value.length <= this.options.maxlength;
  }

  choicesValidate(value) {
    let choices = this.options.choices;
    return this.isEmpty(value) || choices.length > 0 && choices.indexOf(value) > -1
  }

  checkRequired(value) {
    return typeof value === 'string' && value.length > 0;
  }
}
