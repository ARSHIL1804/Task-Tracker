export function isDefined(obj: unknown) : boolean{
    return obj !== null && obj !== undefined;
}

export function isNullOrUndefined(obj: unknown) : boolean{
    return obj === null || obj === undefined;
}

export function isEmpty(obj: String): boolean{
    return obj === '';
}