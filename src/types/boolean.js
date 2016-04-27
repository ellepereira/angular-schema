import SchemaType from 'schematype'
import {CastError} from 'errors'

export class BooleanSchemaType extends SchemaType {

  constructor(field, options) {

    super(field, options);

    if (options.min) {
      this.validators.push(this.minValidate);
    }

    if (options.max) {
      this.validators.push(this.maxValidate);
    }
  }

  cast(value) {
    value = Number(value);

    if (isNaN(value)) {
      throw new CastError('Could not convert value to a number: ' + value);
    }

    return value;
  }

  minValidate() {
    return this.value >= this.options.min;
  }

  maxValidate() {
    return this.value <= this.options.max;
  }

  checkRequired(value) {
    return typeof value === 'number' || value instanceof Number;
  }
}
