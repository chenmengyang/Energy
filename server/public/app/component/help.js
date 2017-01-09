System.register(['@angular/core', '../service/login', '@angular/forms', '@angular/http'], function(exports_1, context_1) {
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
    var core_1, login_1, forms_1, http_1;
    var HelpComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (login_1_1) {
                login_1 = login_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            HelpComponent = class HelpComponent {
                constructor(loginService, formBuilder, http) {
                    this.loginService = loginService;
                    this.formBuilder = formBuilder;
                    this.http = http;
                    this.name = new forms_1.FormControl("", forms_1.Validators.required);
                    this.message = new forms_1.FormControl("", forms_1.Validators.required);
                    this.address = new forms_1.FormControl("", forms_1.Validators.required);
                    this.user = loginService.getUser();
                }
                ngOnInit() {
                    this.emailForm = this.formBuilder.group({
                        name: this.name,
                        message: this.message,
                        address: this.address
                    });
                }
                send() {
                    let headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    this.http.post("/api/mail", JSON.stringify(this.emailForm.value), { headers: headers })
                        .subscribe();
                    //
                    let x = document.getElementById("alert");
                    x.style.display = "block";
                    let form1 = this.emailForm;
                    // 
                    setTimeout(function () {
                        x.style.display = "none";
                        form1.reset();
                    }, 3000);
                }
            };
            HelpComponent = __decorate([
                core_1.Component({
                    templateUrl: "help.html",
                    styles: [
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
        `,
                        `
        div.form-group label
        {
            display:block;
        }
        `,
                        `
        form > button{
            margin-right:10px;
        }
        `,
                        `
        div.alert.alert-success
        {
            display:none;
        }
        `
                    ]
                }), 
                __metadata('design:paramtypes', [login_1.LoginService, forms_1.FormBuilder, http_1.Http])
            ], HelpComponent);
            exports_1("HelpComponent", HelpComponent);
        }
    }
});
//# sourceMappingURL=help.js.map