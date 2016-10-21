System.register(['@angular/core', '../service/address', '../service/resident', '../service/login', '../service/energy', '@angular/forms'], function(exports_1, context_1) {
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
    var core_1, address_1, resident_1, login_1, energy_1, forms_1;
    var JCheckComponent;
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
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }],
        execute: function() {
            let JCheckComponent = class JCheckComponent {
                constructor(residentService, energyService, addressService, loginService, formBuilder) {
                    this.residentService = residentService;
                    this.energyService = energyService;
                    this.addressService = addressService;
                    this.loginService = loginService;
                    this.formBuilder = formBuilder;
                    this.residents = [];
                    // private types = ['water','heater','electricity'];
                    this.Energys = [];
                    this.isLoading = true;
                    this.isEditing = false;
                    this.resident = new forms_1.FormControl("", forms_1.Validators.required);
                    console.log("aiyiai");
                }
                ngOnInit() {
                    this.loadEnergys();
                    this.searchForm = this.formBuilder.group({
                        resident: this.resident
                    });
                }
                loadEnergys() {
                    this.energyService.getEnergyByAddress("all", this.loginService.getResponsibilty())
                        .subscribe(data => {
                        this.Energys = data;
                    }, err => console.log("error loadEnergys!"));
                }
                loadEnergysByResident(rid) {
                    this.energyService.getEnergyByResident("all", rid)
                        .subscribe(data => {
                        this.Energys = data;
                        console.log("data:" + JSON.stringify(data['resident']));
                    }, err => console.log("error loadEnergys!"));
                }
                ngAfterViewInit() {
                    this.loadRes();
                }
                loadRes() {
                    this.residentService.getResidentByAddress().subscribe(data => {
                        this.residents = data;
                    }, err => console.log("error loadRes!"));
                }
                search() {
                    this.loadEnergysByResident(this.searchForm.value.resident);
                }
            };
            JCheckComponent = __decorate([
                core_1.Component({
                    templateUrl: "jcheck.html",
                    providers: [address_1.AddressService, resident_1.ResidentService, energy_1.EnergyService]
                }), 
                __metadata('design:paramtypes', [resident_1.ResidentService, energy_1.EnergyService, address_1.AddressService, login_1.LoginService, forms_1.FormBuilder])
            ], JCheckComponent);
            exports_1("JCheckComponent", JCheckComponent);
        }
    }
});
//# sourceMappingURL=jCheck.js.map