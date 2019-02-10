'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
var has_1 = __importDefault(require("lodash/has"));
function type(value) {
    return Object.prototype.toString
        .call(value)
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
    var newObj = lodash_clonedeep_1["default"](obj);
    var isValidFn = type(fn) === 'function';
    switch (type(keys)) {
        case 'string':
            // pipeline(obj, 'a', fn);
            if (has_1["default"](newObj, keys)) {
                if (isValidFn) {
                    newObj[keys] = fn(newObj[keys]);
                }
            }
            break;
        case 'array':
            keys.forEach(function (key) {
                // pipeline(obj, [ 'a', 'b' ], fn);
                if (type(key) === 'string' && has_1["default"](newObj, key)) {
                    if (isValidFn) {
                        newObj[key] = fn(newObj[key]);
                    }
                }
                else if (type(key) === 'object') {
                    // pipeline(obj, [ 'a', { b: fn } ], fn);
                    for (var k in key) {
                        if (has_1["default"](newObj, k)) {
                            newObj[k] = validFn(key[k]) ? key[k](newObj[k]) : isValidFn ? fn(newObj[k]) : newObj[k];
                        }
                    }
                }
            });
            break;
        case 'object':
            // pipeline(obj, { a: fn }, fn);
            for (var key in keys) {
                if (has_1["default"](newObj, key)) {
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
//# sourceMappingURL=pipeline.js.map