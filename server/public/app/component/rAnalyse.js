System.register(['@angular/core', '../service/address', '../service/resident', '../service/login', '../service/energy'], function(exports_1, context_1) {
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
    var core_1, address_1, resident_1, login_1, energy_1;
    var RAnalyseComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (address_1_1) {
                address_1 = address_1_1;
            },
            function (resident_1_1) {
                resident_1 = resident_1_1;
            },
            function (login_1_1) {
                login_1 = login_1_1;
            },
            function (energy_1_1) {
                energy_1 = energy_1_1;
            }],
        execute: function() {
            RAnalyseComponent = class RAnalyseComponent {
                constructor(energyService, loginService) {
                    this.energyService = energyService;
                    this.loginService = loginService;
                    this.water_arr = [];
                    this.heater_arr = [];
                    this.electricity_arr = [];
                    this.load_data();
                }
                load_data() {
                    this.energyService.getEnergyByResident("all", this.loginService.getUser()._id)
                        .subscribe(data => {
                        data.forEach(e => {
                            if (e.type === "water") {
                                this.water_arr.push([Date.UTC(e.period.substr(0, 4), e.period.substr(5, 7)), e.value]);
                            }
                            else if (e.type === "electricity") {
                                this.electricity_arr.push([Date.UTC(e.period.substr(0, 4), e.period.substr(5, 7)), e.value]);
                            }
                            else if (e.type === "heater") {
                                this.heater_arr.push([Date.UTC(e.period.substr(0, 4), e.period.substr(5, 7)), e.value]);
                            }
                            else {
                                console.log("unknow record type");
                            }
                        });
                        this.options_water = {
                            credits: { enabled: false },
                            chart: { type: 'line' },
                            title: { text: 'Water usage demo' },
                            series: [{
                                    data: this.water_arr,
                                }],
                            xAxis: { type: 'datetime' }
                        };
                        this.options_heater = {
                            credits: { enabled: false },
                            chart: { type: 'column' },
                            title: { text: 'heater usage demo' },
                            series: [{
                                    data: this.heater_arr,
                                }],
                            xAxis: { type: 'datetime' }
                        };
                        this.options_electricity = {
                            credits: { enabled: false },
                            chart: { type: 'spline' },
                            title: { text: 'electricty usage demo' },
                            series: [{
                                    data: this.electricity_arr,
                                }],
                            xAxis: { type: 'datetime' }
                        };
                    }, err => console.log(err));
                }
            };
            RAnalyseComponent = __decorate([
                core_1.Component({
                    templateUrl: "ranalyse.html",
                    // directives: [CHART_DIRECTIVES],
                    providers: [address_1.AddressService, resident_1.ResidentService, energy_1.EnergyService],
                    styles: [`
      chart {
        display: block;
      }
    `
                    ]
                }), 
                __metadata('design:paramtypes', [energy_1.EnergyService, login_1.LoginService])
            ], RAnalyseComponent);
            exports_1("RAnalyseComponent", RAnalyseComponent);
        }
    }
});
//# sourceMappingURL=rAnalyse.js.map