import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../service/login';
import {UserPanelComponent} from './panels/user'

@Component({
    templateUrl: "dashboard.html"
    // providers:[UserService]
})
export class DashComponent {

    private user:any;

    constructor(private router:Router,
                private loginService:LoginService)
    {
        this.router.navigate(['/Dash-admin/Map']);
        this.user = loginService.getUser();
    }
}