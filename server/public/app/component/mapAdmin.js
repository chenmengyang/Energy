System.register(['@angular/core', '../service/address'], function(exports_1, context_1) {
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
    var core_1, address_1;
    var mapAdminComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (address_1_1) {
                address_1 = address_1_1;
            }],
        execute: function() {
            mapAdminComponent = class mapAdminComponent {
                constructor(addressService) {
                    this.addressService = addressService;
                    this.buildings = [];
                    this.colors = ['green', 'red', 'yellow'];
                    addressService.getAddresses().subscribe(a => {
                        a.map(addrx => {
                            // console.log(addrx);
                            let addString = addrx.street + "," + addrx.city + "," + addrx.country;
                            addressService.getCoordinator(addString).subscribe(c => {
                                let tmp = c;
                                tmp['draggable'] = false;
                                tmp['_id'] = addrx._id;
                                tmp['label'] = addrx.name;
                                let index = Math.floor(Math.random() * 3);
                                tmp['icon'] = `/image/mm_20_${this.colors[index]}.png`;
                                this.buildings.push(tmp);
                                this.getCenter();
                            });
                        });
                    }, err => { console.log(err); });
                }
                getCenter() {
                    let lats = [];
                    let lngs = [];
                    this.buildings.forEach(m => {
                        lats.push(m.lat);
                        lngs.push(m.lng);
                    });
                    let len = this.buildings.length;
                    this.lat = lats.reduce((a, b) => { return (a + b); }) / len;
                    this.lng = lngs.reduce((a, b) => { return (a + b); }) / len;
                }
            };
            mapAdminComponent = __decorate([
                core_1.Component({
                    template: `
    <map-panel [markers]="buildings" [lat]="lat" [lng]="lng"> </map-panel>
    `,
                    providers: [address_1.AddressService],
                }), 
                __metadata('design:paramtypes', [address_1.AddressService])
            ], mapAdminComponent);
            exports_1("mapAdminComponent", mapAdminComponent);
        }
    }
});
//# sourceMappingURL=mapAdmin.js.map