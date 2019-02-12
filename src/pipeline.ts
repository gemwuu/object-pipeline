import clonedeep from 'lodash.clonedeep';
import has from 'lodash.has';
import {
  type,
  isFn,
} from './util';
import { CallbackFunctionType } from './type';


export function pipeline(
  obj: object,
  keys: any,
  fn: CallbackFunctionType
) {
  if (!obj || type(obj) !== 'object') {
    return obj;
  }
  const newObj: object = clonedeep(obj);

  switch (type(keys)) {
    case 'string':
      // pipeline(obj, 'a', fn);
      if (has(newObj, keys)) {
        if (isFn(fn)) {
          newObj[keys] = fn(newObj[keys]);
        }
      }
      break;
    case 'array':
      keys.forEach((key: any) => {
        // pipeline(obj, [ 'a', 'b' ], fn);
        if (type(key) === 'string' && has(newObj, key)) {
          if (isFn(fn)) {
            newObj[key] = fn(newObj[key]);
          }
        } else if (type(key) === 'object') {
          // pipeline(obj, [ 'a', { b: fn } ], fn);
          for (const k in key) {
            if (has(newObj, k)) {
              newObj[k] = isFn(key[k]) ? key[k](newObj[k]) : isFn(fn) ? fn(newObj[k]) : newObj[k];
            }
          }
        }
      });
      break;
    case 'object':
      // pipeline(obj, { a: fn }, fn);
      for (const key in keys) {
        if (has(newObj, key)) {
          newObj[key] = isFn(keys[key]) ? keys[key](newObj[key]) : isFn(fn) ? fn(newObj[key]) : newObj[key];
        }
      }
      break;
    default:
      break;
  }
  return newObj;
}
