import { CallbackFunctionType } from './type';


export function type(value: any): string {
  return Object.prototype.toString
    .call(value)
    .match(/\[object\ (.*)\]/)[1]
    .toLowerCase();
}

export function isFn(fn: CallbackFunctionType): boolean {
  return type(fn) === 'function';
}
