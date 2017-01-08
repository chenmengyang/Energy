import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Rule} from '../model';

@Injectable()
export class RuleService{

    constructor(private http: Http){}

    getRule()
    {
        return this.http.get('/api/rules').map(res => res.json());
    }

    queryRule(rid)
    {
        return this.http.get(`/api/rules/${rid}`).map(res => res.json());
    }

    addRule(rule:any)
    {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post("/api/rules", JSON.stringify(rule), {headers: headers});
    }

    editRule(rule:any)
    {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put("/api/rules/"+rule._id, JSON.stringify(rule), {headers: headers});
    }

    deleteRule(rule:any)
    {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var options = new RequestOptions({ body: '', headers: headers});
        return this.http.delete("/api/rules/"+rule._id, options);
    }

}