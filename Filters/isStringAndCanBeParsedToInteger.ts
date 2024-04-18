export function isStringAndCanBeParsedToInteger(data: unknown): boolean | number {
    if (typeof data !== 'string') {
      return false;
    }
    const parsedNumber = parseInt(data, 10); 
    if(isNaN(parsedNumber) || !isFinite(parsedNumber) || !Number.isInteger(parsedNumber) ||parsedNumber.toString().length != data.length)
      return false;
    return parsedNumber;
  }
