import {Injectable} from '@angular/core';

@Injectable()
export class ErrorService {
    error: Object;

    constructor(
        
    ) {
        
    }

    setError(code:string, detail:string) {
        this.error = { code: code, detail: detail };
    }

    getError() {
        return this.error;
    }
}