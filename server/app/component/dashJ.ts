import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../service/login';
import {UserPanelComponent} from './panels/user';

@Component({
    templateUrl: "dashboardJ.html",
    styles:[
        `
       div.row{
           display:flex;
           margin-top:4px;
       }
        `,
        `
       div.col-md-2{
           padding:0;
       }
        `
    ]
    // providers:[UserService]
})
export class DashJComponent {

    private user:any;

    constructor(private router:Router,
                private loginService:LoginService)
    {
        this.router.navigate(['/Dash-janitor/Map']);
        this.user = loginService.getUser();
    }
}