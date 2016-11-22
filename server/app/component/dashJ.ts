import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    templateUrl: "dashboardJ.html"
    // providers:[UserService]
})
export class DashJComponent {
    constructor(private router:Router)
    {
        this.router.navigate(['/Dash-janitor/Map']);
    }
}