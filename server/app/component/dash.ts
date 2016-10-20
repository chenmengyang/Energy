import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    templateUrl: "dashboard.html"
    // providers:[UserService]
})
export class DashComponent {
    constructor(private router:Router)
    {
        this.router.navigate(['/Dash/Address']);
    }
}