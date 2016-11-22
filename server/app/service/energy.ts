import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class EnergyService{

    constructor(private http:Http){
    }

    getEnergyByAddress(time:string,address:string) {
        return this.http.get(`api/energy/time=${time}/address=${address}`).map(res => res.json());
    }

    getEnergyByResident(time:string,resident:string) {
        return this.http.get(`api/energy/time=${time}/resident=${resident}`).map(res => res.json());
    }

    addEnergy(energy) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post("/api/energy", JSON.stringify(energy), {headers: headers});
    }

    editEnergy(energy) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put("/api/energy/"+energy._id, JSON.stringify(energy), {headers: headers});
    }

    deleteEnergy(energy) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var options = new RequestOptions({ body: '', headers: headers});
        return this.http.delete("/api/energy/"+energy._id, options);
    }

}