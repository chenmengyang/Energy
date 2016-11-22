import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, Jsonp, URLSearchParams} from '@angular/http';
import {Address} from '../model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class AddressService{
    
    constructor(private http:Http,
                private jsonp:Jsonp)
    {
    }

    getAddresses(){
        return this.http.get('/api/address').map(res => res.json());
    }

    getCoordinator(address:string)
    {
        let params = new URLSearchParams();
        params.set('address', 'Insinoorinkatu+60,+Tampere,+Finland');
        params.set('key', 'AIzaSyB7yy-d44nqqVi0gwt_3XzjH_sbqSGOra8');
        params.set('callback', 'JSONP_CALLBACK');

        return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+encodeURIComponent(address))
                        .map(res=>res.json())
                        .map(result=>{
                            if (result.status !== "OK") { throw new Error("unable to geocode address"); }
                            let latitude = result.results[0].geometry.location.lat;
                            let longitude = result.results[0].geometry.location.lng;
                            return {'lat':latitude, 'lng':longitude};
                        });
                        // .map(res=><string[]> res.json()[1]);
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