import SchemaType from 'schematype'
import {CastError} from 'errors'

export class ObjectIdSchemaType extends SchemaType {

  constructor(field, options) {
    super(field, options);
  }

  isObjectIdentifier() {
    return true;
  }

  cast(value) {
    value = Number(value);

    if (isNaN(value)) {
      throw new CastError('Could not convert value to a number: ' + value);
    }

    return value;
  }

  checkRequired(value) {
    return typeof value === 'number' || value instanceof Number;
  }
}
