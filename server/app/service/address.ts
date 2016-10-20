import {Injectable} from '@angular/core';
import {Http, HTTP_PROVIDERS, Headers, RequestOptions} from '@angular/http';
import {Address} from '../model';
@Injectable()
export class AddressService{
    
    constructor(private http:Http){
    }

    getAddresses() {
        return this.http.get('/api/address').map(res => res.json());
    }

    addAddress(addr) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post("/api/address", JSON.stringify(addr), {headers: headers});
    }

    editAddress(addr) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put("/api/address/"+addr._id, JSON.stringify(addr), {headers: headers});
    }

    deleteAddress(addr) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var options = new RequestOptions({ body: '', headers: headers});
        // var options = new RequestOptions({ body: '', headers: headers});
        return this.http.delete("/api/address/"+addr._id, options);
    }

}