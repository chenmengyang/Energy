System.register(['@angular/core', '@angular/router', '../../service/login', '../../service/address'], function(exports_1, context_1) {
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
    var core_1, router_1, login_1, address_1;
    var MapComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (login_1_1) {
                login_1 = login_1_1;
            },
            function (address_1_1) {
                address_1 = address_1_1;
            }],
        execute: function() {
            MapComponent = class MapComponent {
                constructor(router, loginService, addressService) {
                    this.router = router;
                    this.loginService = loginService;
                    this.addressService = addressService;
                    this.title = 'Building markers on the map';
                    this.zoom = 12;
                    this.lat = 51.678418;
                    this.lng = 7.809007;
                    this.markers = [];
                    this.colors = ['green', 'red', 'yellow'];
                    // private options;
                    this.addr = [];
                    // this.options = {
                    // 			title : { text : 'simple chart' },
                    // 			series: [{
                    // 				data: [29.9, 71.5, 106.4, 129.2],
                    // 			}]
                    // 		};
                }
                ngOnInit() {
                    this.user = this.loginService.getUser();
                    // get markers
                    if (this.user.role === "admin") {
                        this.addressService.getAddresses().subscribe(a => {
                            a.map(addrx => {
                                let addString = addrx.street + "," + addrx.city + "," + addrx.country;
                                this.addressService.getCoordinator(addString).subscribe(c => {
                                    let tmp = c;
                                    tmp['draggable'] = false;
                                    tmp['_id'] = addrx._id;
                                    tmp['label'] = addrx.name;
                                    let index = Math.floor(Math.random() * 3);
                                    tmp['icon'] = `/image/mm_20_${this.colors[index]}.png`;
                                    this.markers.push(tmp);
                                    this.getCenter();
                                });
                            });
                        }, err => { console.log(err); });
                    }
                    else {
                        this.user.responsibility.forEach(aid => {
                            this.addressService.getAddressById(aid)
                                .subscribe(x => {
                                let addrx = x[0];
                                let addString = addrx.street + "," + addrx.city + "," + addrx.country;
                                this.addressService.getCoordinator(addString).subscribe(c => {
                                    let tmp = c;
                                    tmp['draggable'] = false;
                                    tmp['_id'] = addrx._id;
                                    tmp['label'] = addrx.name;
                                    let index = Math.floor(Math.random() * 3);
                                    tmp['icon'] = `/image/mm_20_${this.colors[index]}.png`;
                                    this.markers.push(tmp);
                                    this.getCenter();
                                });
                            });
                        });
                    }
                }
                getCenter() {
                    let lats = [];
                    let lngs = [];
                    this.markers.forEach(m => {
                        lats.push(m.lat);
                        lngs.push(m.lng);
                    });
                    let len = this.markers.length;
                    this.lat = lats.reduce((a, b) => { return (a + b); }) / len;
                    this.lng = lngs.reduce((a, b) => { return (a + b); }) / len;
                }
                view_building(mid) {
                    this.router.navigate(['/Building/' + mid]);
                }
                ngOnDestroy() {
                    // console.log(this.addr);
                }
            };
            MapComponent = __decorate([
                core_1.Component({
                    selector: 'map-panel',
                    templateUrl: './panels/map-panel.html',
                    styles: [
                        `.sebm-google-map-container {
  height: 500px;
  width: 800px;
}
`
                    ],
                    providers: [address_1.AddressService]
                }), 
                __metadata('design:paramtypes', [router_1.Router, login_1.LoginService, address_1.AddressService])
            ], MapComponent);
            exports_1("MapComponent", MapComponent);
        }
    }
});
//# sourceMappingURL=Map.js.map