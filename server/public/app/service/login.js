System.register(['@angular/core', '@angular/http'], function(exports_1, context_1) {
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
    var core_1, http_1;
    var LoginService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            let LoginService = class LoginService {
                constructor(_http) {
                    this._http = _http;
                    this.user = null;
                    this.token = null;
                }
                tryLogin(u) {
                    let headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    console.log("sending user:" + JSON.stringify(u));
                    return this._http
                        .post('./login', JSON.stringify(u), { headers: headers })
                        .map(res => res.json());
                }
                setLogin(u) {
                    this.user = u;
                    // this.token = t;
                }
                getToken() {
                    return this.token;
                }
                getUser() {
                    return this.user;
                }
                getUserAccount() {
                    return this.user.account;
                }
                isLogged() {
                    // return this.user!=null && this.token!=null;
                    return this.user != null;
                }
                logout() {
                    this.user = null;
                    this.token = null;
                }
            };
            LoginService = __decorate([
                core_1.Injectable(), 
                __metadata('design:paramtypes', [http_1.Http])
            ], LoginService);
            exports_1("LoginService", LoginService);
        }
    }
});
//# sourceMappingURL=login.js.map