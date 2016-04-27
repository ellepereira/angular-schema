export class ValidationError {

  constructor(message) {
    this.name = 'SchemaValidationError';
    this.message = message;
    this.stack = (new Error()).stack;
  }

}

export class CastError {

  constructor(message) {
    this.name = 'SchemaValidationError';
    this.message = message;
    this.stack = (new Error()).stack;
  }

}

export default {ValidationError, CastError}
