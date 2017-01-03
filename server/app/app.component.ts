import {Component} from '@angular/core';
// import {User} from './model/user';
import {LoginService} from './service/login';
@Component({
    selector: 'my-app',
    templateUrl: 'app.html',
    styles:[
        `
        .navbar-nav .nav-item.active a {
            color: #ffffff !important;
            font-weight: 600;
            background: none !important;
            outline: none;
            box-shadow: none !important;
            border-bottom: 6px solid #ffffff;
        }
        `
    ]
})
export class AppComponent
{
    public title: string = "Energy-Demo";
    constructor(private _loginService:LoginService){
    }
}