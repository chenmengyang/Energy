import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    templateUrl: "dashboardR.html"
    // providers:[UserService]
})
export class DashRComponent {
    constructor(private router:Router)
    {
        this.router.navigate(['/Dash-resident/Analyse']);
    }
}