System.register(['@angular/core', '../service/address', '../service/janitor', '@angular/forms'], function(exports_1, context_1) {
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
    var core_1, address_1, janitor_1, forms_1;
    var JanitorComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (address_1_1) {
                address_1 = address_1_1;
            },
            function (janitor_1_1) {
                janitor_1 = janitor_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }],
        execute: function() {
            JanitorComponent = class JanitorComponent {
                // private responsibility = new FormControl("", Validators.required);
                constructor(janitorService, addressService, formBuilder) {
                    this.janitorService = janitorService;
                    this.addressService = addressService;
                    this.formBuilder = formBuilder;
                    this.ass = [];
                    this.Janitors = [];
                    this.janitor = {};
                    this.selectedOptions = [];
                    this.buildings = [];
                    this.isLoading = true;
                    this.isEditing = false;
                    this.account = new forms_1.FormControl("", forms_1.Validators.required);
                    this.password = new forms_1.FormControl("", forms_1.Validators.required);
                    this.email = new forms_1.FormControl("", forms_1.Validators.required);
                    this.phone = new forms_1.FormControl("", forms_1.Validators.required);
                }
                ngOnInit() {
                    this.loadJanitors();
                    this.addJanitorForm = this.formBuilder.group({
                        account: this.account,
                        password: this.password,
                        email: this.email,
                        phone: this.phone
                    });
                }
                ngAfterViewInit() {
                    this.loadAss();
                }
                loadAss() {
                    return this.addressService.getAddresses().subscribe(data => {
                        this.ass = data;
                        console.log("len:" + JSON.stringify(this.ass));
                    }, err => console.log("error loading address!"));
                }
                loadJanitors() {
                    this.janitorService.getJanitors().subscribe(data => this.Janitors = data, err => console.log("error loading address!"));
                }
                submitAdd() {
                    this.addJanitorForm.value["role"] = "janitor";
                    this.addJanitorForm.value["responsibility"] = [];
                    this.janitorService.addJanitor(this.addJanitorForm.value).subscribe(res => {
                        var newJanitor = res.json();
                        this.Janitors.push(newJanitor);
                        this.addJanitorForm.reset();
                    }, err => console.log(err));
                }
                submitEdit(janitor) {
                    this.janitorService.editJanitors(janitor).subscribe(res => {
                        this.isEditing = false;
                        this.janitor = janitor;
                    }, error => console.log(error));
                }
                enableEditing(janitor) {
                    this.isEditing = true;
                    this.janitor = janitor;
                }
                cancelEditing() {
                    this.isEditing = false;
                    this.janitor = {};
                    this.loadJanitors();
                }
                submitRemove(janitor) {
                    if (window.confirm("Are you sure you want to permanently delete this item?")) {
                        this.janitorService.deleteJanitor(janitor).subscribe(res => {
                            var pos = this.Janitors.map(ee => { return ee._id; }).indexOf(janitor._id);
                            this.Janitors.splice(pos, 1);
                        }, error => console.log(error));
                    }
                }
                open_buildings(jid) {
                    this.current_janitorId = jid;
                    this.buildings = [];
                    this.ass.forEach(a => {
                        a["isSelected"] = false;
                    });
                    this.janitorService.queryJanitor(jid).subscribe(res => {
                        this.buildings = res[0].responsibility;
                        this.buildings.forEach(b => {
                            let tmp = this.ass.filter(x => { return x._id == b; });
                            if (tmp) {
                                tmp[0].isSelected = true;
                            }
                        });
                    }, error => console.log(error));
                }
                default_checked(addId) {
                    return this.buildings.filter(b => { return b == addId; }).length;
                }
                edit_responsibility(event) {
                    let bvalue = JSON.stringify(event.target.value).replace(/\"/g, "");
                    if (event.target.checked) {
                        if (this.buildings.filter(x => { return x == bvalue; }).length) {
                        }
                        else {
                            this.buildings.push(bvalue);
                        }
                    }
                    else {
                        if (this.buildings.filter(x => { return x == bvalue; }).length) {
                            this.buildings.splice(this.buildings.indexOf(bvalue), 1);
                        }
                    }
                }
                save_buildings() {
                    this.janitorService.editBuildings(this.current_janitorId, this.buildings).subscribe(res => (null), error => console.log(error));
                }
            };
            JanitorComponent = __decorate([
                core_1.Component({
                    templateUrl: "janitor.html",
                    providers: [address_1.AddressService, janitor_1.JanitorService]
                }), 
                __metadata('design:paramtypes', [janitor_1.JanitorService, address_1.AddressService, forms_1.FormBuilder])
            ], JanitorComponent);
            exports_1("JanitorComponent", JanitorComponent);
        }
    }
});
//# sourceMappingURL=janitor.js.map