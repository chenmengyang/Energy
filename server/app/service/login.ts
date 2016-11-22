import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {User} from '../model';
@Injectable()
export class LoginService{
    private user:User=null;
    private token:string=null;
    constructor(private _http: Http){}
    tryLogin(u:User)
    {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log("sending user:"+JSON.stringify(u));
        return this._http
                .post('./login', JSON.stringify(u),{headers: headers})
                .map(res => res.json());
    }
    setLogin(u:User){
        this.user = u;
        // this.token = t;
    }
    getToken():string{
        return this.token;
    }
    getRole()
    {
        return this.user.role;
    }
    getResponsibilty()
    {
        return this.user.responsibility;
    }
    getUser(){
        return this.user;
    }
    getUserAccount(){
        return this.user.account;
    }
    isLogged(){
        // return this.user!=null && this.token!=null;
        return this.user!=null;
    }
    logout(){
        this.user = null;
        this.token = null;
    }
}
