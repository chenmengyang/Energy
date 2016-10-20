import {Injectable} from '@angular/core';
import {Http, HTTP_PROVIDERS, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class ResidentService{
    
    constructor(private http:Http){
    }

    getResidents() {
        return this.http.get('/api/residents').map(res => res.json());
    }

    addResident(resident) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post("/api/janitors", JSON.stringify(resident), {headers: headers});
    }

    editResident(resident) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put("/api/janitors/"+resident._id, JSON.stringify(resident), {headers: headers});
    }

    deleteResident(resident) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var options = new RequestOptions({ body: '', headers: headers});
        // var options = new RequestOptions({ body: '', headers: headers});
        return this.http.delete("/api/janitors/"+resident._id, options);
    }

}