System.register(['@angular/core', '../service/login', '../service/address', '../service/energy', '@angular/router'], function(exports_1, context_1) {
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
    var core_1, login_1, address_1, energy_1, router_1;
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
            function (energy_1_1) {
                energy_1 = energy_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            BuildingComponent = class BuildingComponent {
                constructor(loginService, addressService, energyService, route) {
                    this.loginService = loginService;
                    this.addressService = addressService;
                    this.energyService = energyService;
                    this.route = route;
                    this.addresses = [];
                    this.selected_address = { "name": "..." };
                    this.messageBox = [];
                    this.energy_electricity = null;
                    this.energy_heater = null;
                    this.energy_water = null;
                    this.time = (new Date()).toISOString().substr(0, 7);
                    this.option_array = [];
                    // this.chart_option = {
                    //             title : { text : 'simple chart' },
                    //             series: [{
                    //                 data: [29.9, 71.5, 106.4, 129.2],
                    //             }]
                    //         };
                    this.user = loginService.getUser();
                    addressService.getAddresses().subscribe(a => {
                        this.addresses = a;
                    }, err => { console.log(err); });
                }
                ngOnInit() {
                    this.refresh_messages(location.pathname.split('/')[2]);
                    this.refresh_energy(location.pathname.split('/')[2]);
                }
                refresh_messages(aid) {
                    this.addressService.getAddressById(aid)
                        .subscribe(x => {
                        this.messageBox = x[0].info;
                    });
                }
                refresh_energy(aid) {
                    this.energy_electricity = "not submitted yet";
                    this.energy_heater = "not submitted yet";
                    this.energy_water = "not submitted yet";
                    this.energyService.getEnergyByAddress(this.time, aid.split('.'))
                        .subscribe(x => {
                        x.forEach(egy => {
                            if (egy["type"] === "water") {
                                this.energy_water = egy["value"];
                            }
                            else if (egy["type"] === "heater") {
                                this.energy_heater = egy["value"];
                            }
                            else if (egy["type"] === "electricity") {
                                this.energy_electricity = egy["value"];
                            }
                        });
                    });
                }
                switch_address(msg) {
                    this.selected_address = msg;
                    this.refresh_messages(this.selected_address._id);
                    this.refresh_energy(this.selected_address._id);
                    this.route.navigate([`/Building/${this.selected_address._id}`]);
                }
                openModalInfo() {
                    if (!this.selected_address._id) {
                        this.selected_address._id = location.pathname.split('/')[2];
                    }
                    this.infoText = "Please add information for the building";
                    $("#infoModal").modal();
                }
                addInfo() {
                    let info_object = { time: (new Date()).toISOString().substr(0, 10), text: this.infoText };
                    this.addressService.addAddressInfo(this.selected_address._id, info_object)
                        .subscribe((x) => {
                        this.refresh_messages(this.selected_address._id);
                    });
                    console.log("clicks");
                }
                openModal(event) {
                    if (!this.selected_address._id) {
                        this.selected_address._id = location.pathname.split('/')[2];
                    }
                    let target = event.target || event.srcElement || event.currentTarget;
                    let btn;
                    if (!target.attributes.name) {
                        btn = target.parentNode;
                    }
                    else {
                        btn = target;
                    }
                    let keyword = btn.attributes.name.nodeValue;
                    console.log("keyword is " + keyword);
                    this.energyService.getEnergyByAddressType("all", this.selected_address._id, keyword)
                        .subscribe(x => {
                        this.option_array = [];
                        this.chart_option = {};
                        if (x.length) {
                            x.forEach(element => {
                                this.option_array.push([Date.UTC(element.period.substr(0, 4), element.period.substr(5, 7)), element.value]);
                            });
                            this.chart_option = {
                                credits: { enabled: false },
                                chart: { type: 'column' },
                                title: { text: `${keyword} usage` },
                                series: [{
                                        data: this.option_array,
                                    }],
                                xAxis: { type: 'datetime',
                                    dateTimeLabelFormats: {
                                        // month: '%e. %b',
                                        month: '%b %e, %Y'
                                    },
                                    title: { text: 'Date' }
                                }
                            };
                        }
                        $("#myModal").modal();
                    });
                }
            };
            BuildingComponent = __decorate([
                core_1.Component({
                    templateUrl: "building.html",
                    providers: [address_1.AddressService, energy_1.EnergyService]
                }), 
                __metadata('design:paramtypes', [login_1.LoginService, address_1.AddressService, energy_1.EnergyService, router_1.Router])
            ], BuildingComponent);
            exports_1("BuildingComponent", BuildingComponent);
        }
    }
});
//# sourceMappingURL=building.js.map