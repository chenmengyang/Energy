System.register(['@angular/core', '../service/address', '@angular/forms'], function(exports_1, context_1) {
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
    var core_1, address_1, forms_1;
    var AddressComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (address_1_1) {
                address_1 = address_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }],
        execute: function() {
            AddressComponent = class AddressComponent {
                constructor(addressService, formBuilder) {
                    this.addressService = addressService;
                    this.formBuilder = formBuilder;
                    this.Addresses = [];
                    this.addr = {};
                    this.isLoading = true;
                    this.isEditing = false;
                    this.name = new forms_1.FormControl("", forms_1.Validators.required);
                    this.country = new forms_1.FormControl("", forms_1.Validators.required);
                    this.city = new forms_1.FormControl("", forms_1.Validators.required);
                    this.street = new forms_1.FormControl("", forms_1.Validators.required);
                    this.building = new forms_1.FormControl("", forms_1.Validators.required);
                    this.block = new forms_1.FormControl("", forms_1.Validators.required);
                }
                ngOnInit() {
                    this.loadAddress();
                    this.addAddressForm = this.formBuilder.group({
                        name: this.name,
                        country: this.country,
                        city: this.city,
                        street: this.street,
                        building: this.building,
                        block: this.block
                    });
                }
                //
                loadAddress() {
                    this.addressService.getAddresses().subscribe(data => this.Addresses = data, err => console.log("error loading address!"));
                }
                //
                submitAdd() {
                    // console.log(this.addAddressForm.value);
                    this.addressService.addAddress(this.addAddressForm.value).subscribe(res => {
                        var newAddr = res.json();
                        this.Addresses.push(newAddr);
                        this.addAddressForm.reset();
                    }, err => console.log(err));
                }
                //
                submitEdit(addr) {
                    this.addressService.editAddress(addr).subscribe(res => {
                        this.isEditing = false;
                        this.addr = addr;
                        // this.sendInfoMsg("item edited successfully.", "success");
                    }, error => console.log(error));
                }
                //
                enableEditing(addr) {
                    this.isEditing = true;
                    this.addr = addr;
                }
                //
                cancelEditing() {
                    this.isEditing = false;
                    this.addr = {};
                    // this.sendInfoMsg("item editing cancelled.", "warning");
                    // reload the cats to reset the editing
                    this.loadAddress();
                }
                //
                submitRemove(addr) {
                    if (window.confirm("Are you sure you want to permanently delete this item?")) {
                        this.addressService.deleteAddress(addr).subscribe(res => {
                            var pos = this.Addresses.map(ee => { return ee._id; }).indexOf(addr._id);
                            this.Addresses.splice(pos, 1);
                        }, error => console.log(error));
                    }
                }
                sortBy(field) {
                    this.Addresses.sort((x, y) => {
                        return (x[field] > y[field]) ? 1 : -1;
                    });
                }
            };
            AddressComponent = __decorate([
                core_1.Component({
                    templateUrl: "address.html",
                    providers: [address_1.AddressService]
                }), 
                __metadata('design:paramtypes', [address_1.AddressService, forms_1.FormBuilder])
            ], AddressComponent);
            exports_1("AddressComponent", AddressComponent);
        }
    }
});
//# sourceMappingURL=address.js.map