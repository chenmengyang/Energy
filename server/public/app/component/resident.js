System.register(['@angular/core', '../service/resident', '../service/address', '@angular/forms'], function(exports_1, context_1) {
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
    var core_1, resident_1, address_1, forms_1;
    var ResidentComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (resident_1_1) {
                resident_1 = resident_1_1;
            },
            function (address_1_1) {
                address_1 = address_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }],
        execute: function() {
            ResidentComponent = class ResidentComponent {
                constructor(residentService, addressService, formBuilder) {
                    this.residentService = residentService;
                    this.addressService = addressService;
                    this.formBuilder = formBuilder;
                    this.ass = [];
                    this.Residents = [];
                    this.resident = {};
                    this.isLoading = true;
                    this.isEditing = false;
                    this.account = new forms_1.FormControl("", forms_1.Validators.required);
                    this.password = new forms_1.FormControl("", forms_1.Validators.required);
                    this.email = new forms_1.FormControl("", forms_1.Validators.required);
                    this.phone = new forms_1.FormControl("", forms_1.Validators.required);
                    this.address = new forms_1.FormControl("", forms_1.Validators.required);
                    this.room = new forms_1.FormControl("", forms_1.Validators.required);
                }
                ngOnInit() {
                    this.loadResidents();
                    this.addResidentForm = this.formBuilder.group({
                        account: this.account,
                        password: this.password,
                        email: this.email,
                        phone: this.phone,
                        address: this.address,
                        room: this.room
                    });
                }
                ngAfterViewInit() {
                    this.loadAss();
                }
                loadAss() {
                    return this.addressService.getAddresses().subscribe(data => {
                        this.ass = data;
                        console.log("len:" + this.ass.length);
                    }, err => console.log("error loading address!"));
                }
                loadResidents() {
                    this.residentService.getResidents().subscribe(data => this.Residents = data, err => console.log("error loading address!"));
                }
                submitAdd() {
                    let formValue = this.addResidentForm.value;
                    formValue["role"] = "resident";
                    this.residentService.addResident(this.addResidentForm.value).subscribe(res => {
                        var newResident = res.json();
                        this.Residents.push(newResident);
                        this.addResidentForm.reset();
                    }, err => console.log(err));
                }
                submitEdit(resident) {
                    this.residentService.editResident(resident).subscribe(res => {
                        this.isEditing = false;
                        this.resident = resident;
                    }, error => console.log(error));
                }
                enableEditing(resident) {
                    this.isEditing = true;
                    this.resident = resident;
                }
                cancelEditing() {
                    this.isEditing = false;
                    this.resident = {};
                    this.loadResidents();
                }
                submitRemove(resident) {
                    if (window.confirm("Are you sure you want to permanently delete this item?")) {
                        this.residentService.deleteResident(resident).subscribe(res => {
                            var pos = this.Residents.map(ee => { return ee._id; }).indexOf(resident._id);
                            this.Residents.splice(pos, 1);
                        }, error => console.log(error));
                    }
                }
            };
            ResidentComponent = __decorate([
                core_1.Component({
                    templateUrl: "resident.html",
                    providers: [resident_1.ResidentService, address_1.AddressService]
                }), 
                __metadata('design:paramtypes', [resident_1.ResidentService, address_1.AddressService, forms_1.FormBuilder])
            ], ResidentComponent);
            exports_1("ResidentComponent", ResidentComponent);
        }
    }
});
//# sourceMappingURL=resident.js.map