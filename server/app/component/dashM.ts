import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../service/login';
import {UserPanelComponent} from './panels/user';

@Component({
    templateUrl: "dashboardM.html"
    // providers:[UserService]
})
export class DashMComponent {

    private user:any;

    constructor(private router:Router,
                private loginService:LoginService)
    {
        this.router.navigate(['/Dash-manager/Map']);
        this.user = loginService.getUser();
    }
}