System.register(['@angular/core', '@angular/router', '@angular/common'], function(exports_1, context_1) {
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
    var core_1, router_1, common_1;
    var AddressListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            AddressListComponent = class AddressListComponent {
                constructor(router, route, location) {
                    this.router = router;
                    this.route = route;
                    this.location = location;
                    this.addressList = [];
                    this.clickAddress = new core_1.EventEmitter();
                    this.selected = this.location.path().split('/')[2];
                }
                ngAfterContentInit() {
                }
                address_click(addr) {
                    this.selected = addr._id;
                    this.clickAddress.emit(addr);
                }
            };
            AddressListComponent = __decorate([
                core_1.Component({
                    selector: 'address-panel',
                    templateUrl: 'panels/address-panel.html',
                    styles: [
                        `
        ul{
            overflow-y:scroll;
        }
        `,
                        `
        li a{
            color: #000;
        }
        `,
                        `
        li .active{
            color: white;
            background-color:75D8C4;
        }
        `,
                        `
        li :hover:not(.active){
            background-color: #555;
            color: white;
        }
        `
                    ],
                    inputs: ['addressList'],
                    outputs: ['clickAddress']
                }), 
                __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, common_1.Location])
            ], AddressListComponent);
            exports_1("AddressListComponent", AddressListComponent);
        }
    }
});
//# sourceMappingURL=addressList.js.map