System.register(['@angular/core', '../model', '../service/login', '@angular/router'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, model_1, login_1, router_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (model_1_1) {
                model_1 = model_1_1;
            },
            function (login_1_1) {
                login_1 = login_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            let LoginComponent = class LoginComponent {
                constructor(loginService, router) {
                    this.loginService = loginService;
                    this.router = router;
                    this.user = new model_1.User();
                    this.errorMessage = null;
                }
                //
                onClick(event) {
                    event.preventDefault();
                    this.errorMessage = null;
                    this.loginService.tryLogin(this.user).subscribe(result => this.onLoginResult(result), error => this.onLoginError(error));
                }
                //
                onLoginResult(result) {
                    this.loginService.setLogin(result.user);
                    let role = this.loginService.getRole();
                    console.log("role is " + role);
                    if (role === "admin") {
                        this.router.navigate(['/Dash-admin']);
                    }
                    else if (role === "janitor") {
                        this.router.navigate(['/Dash-janitor']);
                    }
                    else if (role === "resident") {
                        this.router.navigate(['/Dash-resident']);
                    }
                    else {
                        alert("Unknown privilege user, please contact administrator");
                    }
                }
                //
                onLoginError(error) {
                    this.errorMessage = error._body;
                }
            };
            LoginComponent = __decorate([
                core_1.Component({
                    templateUrl: "login.html"
                }), 
                __metadata('design:paramtypes', [login_1.LoginService, router_1.Router])
            ], LoginComponent);
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.js.map