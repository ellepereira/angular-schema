import SchemaTypes from 'types'

/**
 * Schema Class
 *
 * Holds the definition of a schema describing API resource
 */
class Schema {

  constructor(values) {
    for (var name in values) {

      if (values.hasOwnProperty(name) === false) {
        continue;
      }

      let field = values[name];

      //Any field that is a function we assume to be of internal type (String, Number, ...)
      if (typeof field === 'function') {
        field = {
          type: field
        }
      }

      this.add(name, field);
    }
  }

  *[Symbol.iterator]() {

    for(let field in this){
      if(this.hasOwnProperty(field) === false){
        continue;
      }

      yield [field, this[field]];
    }
  }

  static get types() {
    return SchemaTypes;
  }

  /**
   * Returns true if this schema has a primary field identifier.
   * @returns {boolean}
   */
  hasObjectId() {
    for (var field in this) {
      if (!this.hasOwnProperty(field)) {
        continue;
      }

      if (this[field].isObjectIdentifier() === true) {
        return true;
      }
    }

    return false;
  }

  /**
   * Adds a field to the schema
   * @param name
   * @param field
   */
  add(name, field) {
    let SchemaType = SchemaTypes.get(field.type);
    this[name] = new SchemaType(name, field);
  }

  remove(name) {
    delete this[name];
  }

  /**
   * Validate the field values provided against our field validation for each key
   * @param values
   * @returns {{}}
   */
  validate(values) {
    var errors = {};
    for (var field in this) {
      if (this.hasOwnProperty(field) === false) {
        continue;
      }

      let validate = this[field].validate(values[field]);

      if (Object.keys(validate).length > 0) {
        errors[field] = validate;
      }
    }

    return errors;
  }

}

export default Schema;
