import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RailwayReceiptService {
    constructor(private http: Http) {

    }
    getRRList(): Promise<any> {
        return this.http
            .get('/api/rr/get-rr-list')
            .toPromise()
            .then(res => res.json())
            .catch(res => null);
    }
}