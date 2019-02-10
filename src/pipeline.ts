'use strict';

import clonedeep from 'lodash.clonedeep';
import has from 'lodash.has';

type CallbackFunctionType = (...args: any[]) => any;

function type(value: any): string {
  return Object.prototype.toString
    .call(value)
    .match(/\[object\ (.*)\]/)[1]
    .toLowerCase();
}

function validFn(fn: CallbackFunctionType): boolean {
  return type(fn) === 'function';
}

export function pipeline(
  obj: object,
  keys: any,
  fn: CallbackFunctionType
) {
  if (!obj || type(obj) !== 'object') {
    return obj;
  }
  const newObj: object = clonedeep(obj);
  const isValidFn: boolean = type(fn) === 'function';

  switch (type(keys)) {
    case 'string':
      // pipeline(obj, 'a', fn);
      if (has(newObj, keys)) {
        if (isValidFn) {
          newObj[keys] = fn(newObj[keys]);
        }
      }
      break;
    case 'array':
      keys.forEach((key: any) => {
        // pipeline(obj, [ 'a', 'b' ], fn);
        if (type(key) === 'string' && has(newObj, key)) {
          if (isValidFn) {
            newObj[key] = fn(newObj[key]);
          }
        } else if (type(key) === 'object') {
          // pipeline(obj, [ 'a', { b: fn } ], fn);
          for (const k in key) {
            if (has(newObj, k)) {
              newObj[k] = validFn(key[k]) ? key[k](newObj[k]) : isValidFn ? fn(newObj[k]) : newObj[k];
            }
          }
        }
      });
      break;
    case 'object':
      // pipeline(obj, { a: fn }, fn);
      for (const key in keys) {
        if (has(newObj, key)) {
          newObj[key] = validFn(keys[key]) ? keys[key](newObj[key]) : isValidFn ? fn(newObj[key]) : newObj[key];
        }
      }
      break;
    default:
      break;
  }
  return newObj;
}
