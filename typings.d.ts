type Printer = (message: string, data: any) => void;

export class Exception {
    
    name: string;
    error: Error;
    message: string;
    data: any;
    couse: any;
    
    constructor(msg: string, data?: any, couse?: any);
    toString(): string;
    printData(printer: Printer): void;
    static printer: Printer;
    static print(e: any, printer?: Printer): void;
    
}

export class IllegalArgumentException extends Exception {
    
    constructor(paramName?: string, paramValue?: any);
}

export class UnsupportedOperationException extends Exception {
    
    constructor();
}
