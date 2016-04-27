import {StringSchemaType} from 'types/string'
import {NumberSchemaType} from 'types/number'
import {ObjectIdSchemaType} from 'types/objectid'
import {BooleanSchemaType} from 'types/boolean'

import 'babel-polyfill'

let types = new Map();
types.set(String, StringSchemaType);
types.set(Number, NumberSchemaType);
types.set(ObjectIdSchemaType, ObjectIdSchemaType);
types.ObjectId = ObjectIdSchemaType;
types.String = StringSchemaType;
types.Number = NumberSchemaType;
export default types;
