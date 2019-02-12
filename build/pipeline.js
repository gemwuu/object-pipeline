"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
var lodash_has_1 = __importDefault(require("lodash.has"));
var util_1 = require("./util");
function pipeline(obj, keys, fn) {
    if (!obj || util_1.type(obj) !== 'object') {
        return obj;
    }
    var newObj = lodash_clonedeep_1["default"](obj);
    switch (util_1.type(keys)) {
        case 'string':
            // pipeline(obj, 'a', fn);
            if (lodash_has_1["default"](newObj, keys)) {
                if (util_1.isFn(fn)) {
                    newObj[keys] = fn(newObj[keys]);
                }
            }
            break;
        case 'array':
            keys.forEach(function (key) {
                // pipeline(obj, [ 'a', 'b' ], fn);
                if (util_1.type(key) === 'string' && lodash_has_1["default"](newObj, key)) {
                    if (util_1.isFn(fn)) {
                        newObj[key] = fn(newObj[key]);
                    }
                }
                else if (util_1.type(key) === 'object') {
                    // pipeline(obj, [ 'a', { b: fn } ], fn);
                    for (var k in key) {
                        if (lodash_has_1["default"](newObj, k)) {
                            newObj[k] = util_1.isFn(key[k]) ? key[k](newObj[k]) : util_1.isFn(fn) ? fn(newObj[k]) : newObj[k];
                        }
                    }
                }
            });
            break;
        case 'object':
            // pipeline(obj, { a: fn }, fn);
            for (var key in keys) {
                if (lodash_has_1["default"](newObj, key)) {
                    newObj[key] = util_1.isFn(keys[key]) ? keys[key](newObj[key]) : util_1.isFn(fn) ? fn(newObj[key]) : newObj[key];
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