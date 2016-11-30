System.register(['@angular/core', '../service/login', '../service/address', '@angular/router'], function(exports_1, context_1) {
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
    var core_1, login_1, address_1, router_1;
    var BuildingComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (login_1_1) {
                login_1 = login_1_1;
            },
            function (address_1_1) {
                address_1 = address_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            BuildingComponent = class BuildingComponent {
                constructor(loginService, addressService, route) {
                    this.loginService = loginService;
                    this.addressService = addressService;
                    this.route = route;
                    this.addresses = [];
                    this.selected_address = { "name": "..." };
                    this.user = loginService.getUser();
                    addressService.getAddresses().subscribe(a => {
                        this.addresses = a;
                    }, err => { console.log(err); });
                }
                ngOnInit() {
                }
                switch_address(msg) {
                    this.selected_address = msg;
                    this.route.navigate([`/Building/Data/${this.selected_address._id}`]);
                }
            };
            BuildingComponent = __decorate([
                core_1.Component({
                    templateUrl: "building.html",
                    providers: [address_1.AddressService]
                }), 
                __metadata('design:paramtypes', [login_1.LoginService, address_1.AddressService, router_1.Router])
            ], BuildingComponent);
            exports_1("BuildingComponent", BuildingComponent);
        }
    }
});
//# sourceMappingURL=building.js.map