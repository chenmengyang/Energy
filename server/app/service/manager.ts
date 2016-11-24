import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class ManagerService{
    
    constructor(private http:Http){
    }

    getManagers() {
        return this.http.get('/api/managers').map(res => res.json());
    }

    queryManager(mid) {
        return this.http.get(`/api/managers/${mid}`).map(res => res.json());
    }

    addManager(manager) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post("/api/managers", JSON.stringify(manager), {headers: headers});
    }

    editManagers(manager) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put("/api/managers/"+manager._id, JSON.stringify(manager), {headers: headers});
    }

    editBuildings(mid,buildings){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log("mid:"+mid+ " url:"+"/api/janitors/"+mid+"/"+buildings);
        return this.http.put("/api/managers/buildings/"+mid+"/"+buildings,JSON.stringify(buildings),{headers: headers});
    }

    deleteManager(manager) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var options = new RequestOptions({ body: '', headers: headers});
        // var options = new RequestOptions({ body: '', headers: headers});
        return this.http.delete("/api/managers/"+manager._id, options);
    }

}