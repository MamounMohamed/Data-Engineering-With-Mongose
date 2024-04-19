function checkAndReturn(data :number , minAllowed :number , maxAllowed:number) :number{
    if(typeof data == "number" && data >=minAllowed && data<=maxAllowed)
    {
        return data;
    }
    return minAllowed;
}



export function transform(data : unknown , minAllowed : number , maxAllowed : number) : number{

    if(typeof data == "number")
    {
        return checkAndReturn(data ,minAllowed,maxAllowed);
    }
    
        if (typeof data === "string") {
            const parsedNumber = parseInt(data, 10); // Use parseInt to parse the string to an integer
            if (!isNaN(parsedNumber) && Number.isInteger(parsedNumber) && isFinite(parsedNumber)) {
                return checkAndReturn(parsedNumber, minAllowed, maxAllowed);
            }
        }
        

    return minAllowed;
}


