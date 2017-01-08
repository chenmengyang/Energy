System.register(['@angular/core', '@angular/router', '../../service/login', '../../service/energy', '../../service/rule', '../../service/address'], function(exports_1, context_1) {
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
    var core_1, router_1, login_1, energy_1, rule_1, address_1;
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
            function (energy_1_1) {
                energy_1 = energy_1_1;
            },
            function (rule_1_1) {
                rule_1 = rule_1_1;
            },
            function (address_1_1) {
                address_1 = address_1_1;
            }],
        execute: function() {
            MapComponent = class MapComponent {
                constructor(router, loginService, addressService, energyService, ruleService) {
                    this.router = router;
                    this.loginService = loginService;
                    this.addressService = addressService;
                    this.energyService = energyService;
                    this.ruleService = ruleService;
                    this.title = 'Building markers on the map';
                    this.zoom = 12;
                    this.lat = 51.678418;
                    this.lng = 7.809007;
                    this.markers = [];
                    this.colors = ['danger', 'warning', 'success'];
                    this.rules = [];
                    // private options;
                    this.addr = [];
                    this.current_month = (new Date()).toISOString().substr(0, 7);
                    let tmp;
                    this.setIcon("585bac6e9e97fc80d06cee3e", tmp);
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
                                    // let index = Math.floor(Math.random()*3);
                                    tmp['icon'] = `/image/success.png`;
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
                                    // let index = Math.floor(Math.random()*3);
                                    tmp['icon'] = `/image/success.png`;
                                    this.markers.push(tmp);
                                    this.getCenter();
                                });
                            });
                        });
                    }
                }
                setIcon(addressId, m) {
                    if (this.rules.length === 0) {
                        this.ruleService.getRule().subscribe(r => {
                            this.rules = r;
                            this.water_danger = this.rules.filter(e => { return e.type === "water" && e.level === "danger"; })[0].threshold;
                            this.water_warning = this.rules.filter(e => { return e.type === "water" && e.level === "warning"; })[0].threshold;
                            this.heater_danger = this.rules.filter(e => { return e.type === "heater" && e.level === "danger"; })[0].threshold;
                            this.heater_warning = this.rules.filter(e => { return e.type === "heater" && e.level === "warning"; })[0].threshold;
                            this.electricity_danger = this.rules.filter(e => { return e.type === "electricity" && e.level === "danger"; })[0].threshold;
                            this.electricity_warning = this.rules.filter(e => { return e.type === "electricity" && e.level === "warning"; })[0].threshold;
                            console.log("this.electricity_warning is " + this.electricity_warning);
                        });
                    }
                    else {
                        this.energyService.getEnergyByAddressType(this.current_month, addressId, "water").
                            subscribe(record => {
                        });
                    }
                }
                compareValue(aid) {
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
                }
            };
            MapComponent = __decorate([
                core_1.Component({
                    selector: 'map-panel',
                    templateUrl: './panels/map-panel.html',
                    styles: [
                        `
		.panel-default{
		  margin:0;
	  }
	  `,
                        `
		.panel-body{
			padding:0;
		}
		`,
                        `.sebm-google-map-container {
		  height:480px;
		  
		}
	`
                    ],
                    providers: [address_1.AddressService, energy_1.EnergyService, rule_1.RuleService]
                }), 
                __metadata('design:paramtypes', [router_1.Router, login_1.LoginService, address_1.AddressService, energy_1.EnergyService, rule_1.RuleService])
            ], MapComponent);
            exports_1("MapComponent", MapComponent);
        }
    }
});
//# sourceMappingURL=Map.js.map