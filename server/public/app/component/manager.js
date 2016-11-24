System.register(['@angular/core', '../service/address', '../service/manager', '@angular/forms'], function(exports_1, context_1) {
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
    var core_1, address_1, manager_1, forms_1;
    var ManagerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (address_1_1) {
                address_1 = address_1_1;
            },
            function (manager_1_1) {
                manager_1 = manager_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }],
        execute: function() {
            ManagerComponent = class ManagerComponent {
                // private responsibility = new FormControl("", Validators.required);
                constructor(managerService, addressService, formBuilder) {
                    this.managerService = managerService;
                    this.addressService = addressService;
                    this.formBuilder = formBuilder;
                    this.ass = [];
                    this.Managers = [];
                    this.manager = {};
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
                    this.loadManagers();
                    this.addManagerForm = this.formBuilder.group({
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
                loadManagers() {
                    this.managerService.getManagers().subscribe(data => this.Managers = data, err => console.log("error loading address!"));
                }
                submitAdd() {
                    this.addManagerForm.value["role"] = "manager";
                    this.addManagerForm.value["responsibility"] = [];
                    this.managerService.addManager(this.addManagerForm.value).subscribe(res => {
                        var newManager = res.json();
                        this.Managers.push(newManager);
                        this.addManagerForm.reset();
                    }, err => console.log(err));
                }
                submitEdit(manager) {
                    this.managerService.editManagers(manager).subscribe(res => {
                        this.isEditing = false;
                        this.manager = manager;
                    }, error => console.log(error));
                }
                enableEditing(manager) {
                    this.isEditing = true;
                    this.manager = manager;
                }
                cancelEditing() {
                    this.isEditing = false;
                    this.manager = {};
                    this.loadManagers();
                }
                submitRemove(manager) {
                    if (window.confirm("Are you sure you want to permanently delete this item?")) {
                        this.managerService.deleteManager(manager).subscribe(res => {
                            var pos = this.Managers.map(ee => { return ee._id; }).indexOf(manager._id);
                            this.Managers.splice(pos, 1);
                        }, error => console.log(error));
                    }
                }
                open_buildings(jid) {
                    this.current_managerId = jid;
                    this.buildings = [];
                    this.ass.forEach(a => {
                        a["isSelected"] = false;
                    });
                    this.managerService.queryManager(jid).subscribe(res => {
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
                    this.managerService.editBuildings(this.current_managerId, this.buildings).subscribe(res => (null), error => console.log(error));
                }
            };
            ManagerComponent = __decorate([
                core_1.Component({
                    templateUrl: "manager.html",
                    providers: [address_1.AddressService, manager_1.ManagerService]
                }), 
                __metadata('design:paramtypes', [manager_1.ManagerService, address_1.AddressService, forms_1.FormBuilder])
            ], ManagerComponent);
            exports_1("ManagerComponent", ManagerComponent);
        }
    }
});
//# sourceMappingURL=manager.js.map