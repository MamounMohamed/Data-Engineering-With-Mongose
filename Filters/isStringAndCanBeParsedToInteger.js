"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStringAndCanBeParsedToInteger = void 0;
function isStringAndCanBeParsedToInteger(data) {
    if (typeof data !== 'string') {
        return false;
    }
    const parsedNumber = parseInt(data, 10);
    if (isNaN(parsedNumber) || !isFinite(parsedNumber) || !Number.isInteger(parsedNumber) || parsedNumber.toString().length != data.length)
        return false;
    return parsedNumber;
}
exports.isStringAndCanBeParsedToInteger = isStringAndCanBeParsedToInteger;
