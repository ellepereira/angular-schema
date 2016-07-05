import SchemaType from 'schematype'
import {CastError} from 'errors'

export class NumberSchemaType extends SchemaType {

  constructor(field, options) {

    super(field, options);

    if (options.min) {
      this.validators.set('min', this.minValidate);
    }

    if (options.max) {
      this.validators.set('max', this.maxValidate);
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
    if (this.value < this.options.min) {
      return `invalid value: ${this.value} is less than minimal value ${this.options.min}`;
    }
  }

  maxValidate() {
    if (this.value > this.options.max) {
      return `invalid value: ${this.value} is more than maximum value ${this.options.max}`;
    }
  }

  checkRequired(value) {
    return typeof value === 'number' || value instanceof Number;
  }
}
