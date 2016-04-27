import {ValidationError} from 'errors'

export default class {

  constructor(field, options) {
    this.options = options;
    this.field = field;
    this.validators = new Map();

    if (options.required) {
      this.validators.set('required', this.checkRequired);
    }
  }

  /**
   * Cast from other types to this type
   * @param value
   * @returns {string}
   */
  cast(value) {
    return value;
  }

  validate(value) {
    let errors = {};
    this.validators.forEach((validator, validatorName) => {
      let result = validator.call(this, value);
      if (result) {
        errors[validatorName] = result;
      }
    }, this);

    return errors;
  }

  /**
   * Returns true if this value is empty
   */
  isEmpty(value) {
    return typeof value === 'undefined' || value === null;
  }

  isObjectIdentifier() {
    return false;
  }

  checkRequired(value) {
    return !this.isEmpty(value);
  }
}
