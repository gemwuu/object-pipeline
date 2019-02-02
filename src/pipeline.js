'use strict';
/**
 * @author: tianding.wk
 * @createdTime: 2019-02-02 17:13:02
 * @fileName: pipeline.js
 * @description:
 **/

const clonedeep = require('lodash.clonedeep');
const has = require('lodash.has');

function type(v) {
  return Object.prototype.toString
    .call(v)
    .match(/\[object\ (.*)\]/)[1]
    .toLowerCase();
}

function validFn(fn) {
  return type(fn) === 'function';
}

function pipeline(obj, keys, fn) {
  if (!obj || type(obj) !== 'object') {
    return obj;
  }
  const newObj = clonedeep(obj);
  const isValidFn = type(fn) === 'function';

  switch(type(keys)) {
    case 'string':
      // pipeline(obj, 'a', fn);
      if (has(newObj, keys)) {
        if (isValidFn) {
          newObj[keys] = fn(newObj[keys]);
        }
      }
      break;
    case 'array':
      keys.forEach(key => {
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

exports.pipeline = pipeline;

