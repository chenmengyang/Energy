import {Component} from '@angular/core';
import {User} from '../model';
// import {UserService} from '../service/user';
import {LoginService} from '../service/login';
import {Router} from '@angular/router';

@Component({
    templateUrl: "login.html"
    // providers:[UserService]
})
export class LoginComponent {
    private user:User = new User();
    private errorMessage:string = null;
    constructor(private loginService:LoginService,
                private router:Router)
    {
    }
    //
    onClick(event){
        event.preventDefault();
        this.errorMessage = null;
        this.loginService.tryLogin(this.user).subscribe(
            result=>this.onLoginResult(result),
            error=>this.onLoginError(error)
            // res=>console.log(res)
        );
    }
    //
    onLoginResult(result){
        this.loginService.setLogin(result.user);
        this.router.navigate(['/Dash']);
    }
    //
    onLoginError(error){
        this.errorMessage = error._body;
    }
}