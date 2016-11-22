import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class JanitorService{
    
    constructor(private http:Http){
    }

    getJanitors() {
        return this.http.get('/api/janitors').map(res => res.json());
    }

    addJanitor(janitor) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post("/api/janitors", JSON.stringify(janitor), {headers: headers});
    }

    editJanitors(janitor) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put("/api/janitors/"+janitor._id, JSON.stringify(janitor), {headers: headers});
    }

    deleteJanitor(janitor) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var options = new RequestOptions({ body: '', headers: headers});
        // var options = new RequestOptions({ body: '', headers: headers});
        return this.http.delete("/api/janitors/"+janitor._id, options);
    }

}