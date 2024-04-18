import{isStringAndCanBeParsedToInteger} from './isStringAndCanBeParsedToInteger';

export function transformYear(data : unknown) : number{
    var value = isStringAndCanBeParsedToInteger(data);

    if(typeof data == "number" && data >=1600 && data<=new Date().getFullYear())
    {
        return data;
    }
    if (typeof value == "number" && value >= 1600 && value <= new Date().getFullYear()) {
        return value;
    }
    else
    {
        return 1600;
    }

}
console.log(transformYear(1525))
console.log(transformYear("mamoun"))
console.log(transformYear("1525"))
console.log(transformYear(2025))
console.log(transformYear("2025"))
console.log(transformYear(2023))
console.log(transformYear("2023"))



