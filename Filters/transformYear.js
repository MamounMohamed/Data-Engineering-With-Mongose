"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformYear = void 0;
const isStringAndCanBeParsedToInteger_1 = require("./isStringAndCanBeParsedToInteger");
function transformYear(data) {
    var value = (0, isStringAndCanBeParsedToInteger_1.isStringAndCanBeParsedToInteger)(data);
    if (typeof data == "number" && data >= 1600 && data <= new Date().getFullYear()) {
        return data;
    }
    if (typeof value == "number" && value >= 1600 && value <= new Date().getFullYear()) {
        return value;
    }
    else {
        return 1600;
    }
}
exports.transformYear = transformYear;
console.log(transformYear(1525));
console.log(transformYear("mamoun"));
console.log(transformYear("1525"));
console.log(transformYear(2025));
console.log(transformYear("2025"));
console.log(transformYear(2023));
console.log(transformYear("2023"));
