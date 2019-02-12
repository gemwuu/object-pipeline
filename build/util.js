"use strict";
exports.__esModule = true;
function type(value) {
    return Object.prototype.toString
        .call(value)
        .match(/\[object\ (.*)\]/)[1]
        .toLowerCase();
}
exports.type = type;
function isFn(fn) {
    return type(fn) === 'function';
}
exports.isFn = isFn;
//# sourceMappingURL=util.js.map