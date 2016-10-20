import {Component} from '@angular/core';
// import {User} from './model/user';
import {LoginService} from './service/login';
@Component({
    selector: 'my-app',
    templateUrl: 'app.html'
})
export class AppComponent
{
    public title: string = "Energy-Demo";
    constructor(private _loginService:LoginService){
    }
}