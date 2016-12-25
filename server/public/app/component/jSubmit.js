System.register(['@angular/core', '../service/address', '../service/login', '../service/energy', '@angular/forms'], function(exports_1, context_1) {
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
    var core_1, address_1, login_1, energy_1, forms_1;
    var JSubmitComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (address_1_1) {
                address_1 = address_1_1;
            },
            function (login_1_1) {
                login_1 = login_1_1;
            },
            function (energy_1_1) {
                energy_1 = energy_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }],
        execute: function() {
            JSubmitComponent = class JSubmitComponent {
                constructor(energyService, addressService, formBuilder, loginService) {
                    this.energyService = energyService;
                    this.addressService = addressService;
                    this.formBuilder = formBuilder;
                    this.loginService = loginService;
                    this.residents = [];
                    this.buildings = [];
                    this.types = ['water', 'heater', 'electricity'];
                    this.Energys = [];
                    this.energy = {};
                    this.isLoading = true;
                    this.isEditing = false;
                    this.period = new forms_1.FormControl("", forms_1.Validators.required);
                    this.type = new forms_1.FormControl("", forms_1.Validators.required);
                    this.value = new forms_1.FormControl("", forms_1.Validators.required);
                    this.building = new forms_1.FormControl("", forms_1.Validators.required);
                    this.time = (new Date()).toISOString().substr(0, 7);
                }
                ngOnInit() {
                    this.loadEnergys();
                    this.addEnergyForm = this.formBuilder.group({
                        building: this.building,
                        period: this.period,
                        type: this.type,
                        value: this.value
                    });
                }
                loadEnergys() {
                    this.energyService.getEnergyByAddress(this.time, this.loginService.getResponsibilty())
                        .subscribe(data => {
                        this.Energys = data;
                        this.Energys.map(x => {
                            this.addressService.getAddressById(x['building'])
                                .subscribe(addr => {
                                x['address'] = addr[0]['name'];
                            });
                        });
                    }, err => console.log("error loadEnergys!"));
                }
                ngAfterViewInit() {
                    this.loadBuildings();
                }
                loadBuildings() {
                    this.loginService.getResponsibilty().forEach(aid => {
                        this.addressService.getAddressById(aid)
                            .subscribe(addr => {
                            this.buildings.push(addr[0]);
                            // console.log("this.buildings is "+this.buildings);
                        });
                    });
                }
                submitAdd() {
                    let formValue = this.addEnergyForm.value;
                    // formValue["role"] = "janitor";
                    this.energyService.addEnergy(this.addEnergyForm.value).subscribe(res => {
                        var newEnergy = res.json();
                        this.addressService.getAddressById(newEnergy["building"])
                            .subscribe(x => {
                            newEnergy["address"] = x[0]['name'];
                            this.Energys.push(newEnergy);
                        });
                        this.addEnergyForm.reset();
                    }, err => console.log(err));
                }
                submitEdit(energy) {
                    this.energyService.editEnergy(energy).subscribe(res => {
                        this.isEditing = false;
                        this.energy = energy;
                    }, error => console.log(error));
                }
                enableEditing(energy) {
                    this.isEditing = true;
                    this.energy = energy;
                }
                cancelEditing() {
                    this.isEditing = false;
                    this.energy = {};
                    this.loadEnergys();
                }
                submitRemove(energy) {
                    if (window.confirm("Are you sure you want to permanently delete this item?")) {
                        this.energyService.deleteEnergy(energy).subscribe(res => {
                            var pos = this.Energys.map(ee => { return ee._id; }).indexOf(energy._id);
                            this.Energys.splice(pos, 1);
                        }, error => console.log(error));
                    }
                }
            };
            JSubmitComponent = __decorate([
                core_1.Component({
                    templateUrl: "jsubmit.html",
                    providers: [address_1.AddressService, energy_1.EnergyService]
                }), 
                __metadata('design:paramtypes', [energy_1.EnergyService, address_1.AddressService, forms_1.FormBuilder, login_1.LoginService])
            ], JSubmitComponent);
            exports_1("JSubmitComponent", JSubmitComponent);
        }
    }
});
//# sourceMappingURL=jSubmit.js.map