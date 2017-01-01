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
                    this.current_year = (new Date()).toISOString().substr(0, 4);
                    this.last_year = String(Number((new Date()).toISOString().substr(0, 4)) - 1);
                    this.data_current = [];
                    this.data_last = [];
                    this.option_array = [];
                    //
                    this.update_keyword = "unknown";
                    this.dataValue = null;
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
                    // 
                    this.data_current = [null, null, null, null, null, null, null, null, null, null, null, null];
                    this.data_last = [null, null, null, null, null, null, null, null, null, null, null, null];
                    this.energyService.getEnergyByAddressType("all", this.selected_address._id, keyword)
                        .subscribe(x => {
                        this.option_array = [];
                        this.chart_option = {};
                        if (x.length) {
                            x.forEach(element => {
                                let yy = element.period.substr(0, 4);
                                let mm = element.period.substr(5, 7);
                                //
                                if (yy === this.current_year) {
                                    this.data_current[Number(mm) - 1] = element.value;
                                }
                                else if (yy === this.last_year) {
                                    this.data_last[Number(mm) - 1] = element.value;
                                }
                                // this.option_array.push([Date.UTC(element.period.substr(0,4),element.period.substr(5,7)),element.value]);
                            });
                            this.chart_option = {
                                credits: { enabled: false },
                                chart: { type: 'column' },
                                title: { text: `${keyword} usage` },
                                series: [
                                    {
                                        name: this.current_year,
                                        data: this.data_current
                                    },
                                    {
                                        name: this.last_year,
                                        data: this.data_last
                                    }
                                ],
                                xAxis: { categories: [
                                        'Jan',
                                        'Feb',
                                        'Mar',
                                        'Apr',
                                        'May',
                                        'Jun',
                                        'Jul',
                                        'Aug',
                                        'Sep',
                                        'Oct',
                                        'Nov',
                                        'Dec'
                                    ], crosshair: true },
                                yAxis: {
                                    min: 0,
                                    title: {
                                        text: 'value'
                                    }
                                },
                                tooltip: {
                                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                                    footerFormat: '</table>',
                                    shared: true,
                                    useHTML: true
                                },
                                plotOptions: {
                                    column: {
                                        pointPadding: 0.2,
                                        borderWidth: 0
                                    }
                                }
                            };
                        }
                        $("#myModal").modal();
                    });
                }
                openModalUpdate(event) {
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
                    this.update_keyword = btn.attributes.name.nodeValue;
                    if (this.update_keyword === "electricity") {
                        this.dataValue = this.energy_electricity;
                    }
                    else if (this.update_keyword === "heater") {
                        this.dataValue = this.energy_heater;
                    }
                    else {
                        this.dataValue = this.energy_water;
                    }
                    $("#updateModal").modal();
                }
                updateDate() {
                    this.energyService.updateEnergyValue(this.selected_address._id, this.time, this.update_keyword, this.dataValue)
                        .subscribe(x => {
                        this.refresh_energy(this.selected_address._id);
                    });
                }
            };
            BuildingComponent = __decorate([
                core_1.Component({
                    templateUrl: "building.html",
                    providers: [address_1.AddressService, energy_1.EnergyService],
                    styles: [
                        `
        textarea{
            width:100%;
        }
        `,
                        `
        button.head{
            border-radius:5px;
            padding:3px;
            font-size: 9px;
        }
        `,
                        `
        button.chart{
            float:right;
            padding-left:5px;
            padding-right:5px;
            padding-top:2px;
            padding-bottom:2px;
        }
        `,
                        `
        i.data{
            width:15px;
        }
        `,
                        `
        p.labelx{
            display:inline-block;
            width:65px;
            text-align:center;
        }
        `,
                        `
        li.list-group-item{
            padding-bottom:2px;
            padding-top:5px;
        }
        `,
                        `
        div.modal-body{
            text-align:center;
        }
        `,
                        `
        input{
            padding:4px;
            margin-left:3px;
        }
        `,
                        `
        span.timeSpan{
            background-color:grey;
            border-radius:5px;
            padding:4px;
            color:white;
            margin-right:5px;
            margin-bottom:5px;
        }
        `
                    ]
                }), 
                __metadata('design:paramtypes', [login_1.LoginService, address_1.AddressService, energy_1.EnergyService, router_1.Router])
            ], BuildingComponent);
            exports_1("BuildingComponent", BuildingComponent);
        }
    }
});
//# sourceMappingURL=building.js.map