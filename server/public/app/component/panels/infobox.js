System.register(['@angular/core', '../../service/address', 'rxjs/Subject', 'rxjs/add/operator/debounceTime', 'rxjs/add/operator/distinctUntilChanged'], function(exports_1, context_1) {
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
    var core_1, address_1, Subject_1;
    var InfoboxPanelComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (address_1_1) {
                address_1 = address_1_1;
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (_1) {},
            function (_2) {}],
        execute: function() {
            InfoboxPanelComponent = class InfoboxPanelComponent {
                constructor(addressService) {
                    this.addressService = addressService;
                    this.bid = new Subject_1.Subject();
                }
                ngAfterContentInit() {
                    console.log("bid is " + this.bid);
                }
                ngOnInit() {
                    this.bid.distinctUntilChanged()
                        .subscribe(x => {
                        console.log("x is " + x);
                    });
                }
            };
            InfoboxPanelComponent = __decorate([
                core_1.Component({
                    selector: 'infobox-panel',
                    templateUrl: 'panels/infobox-panel.html',
                    styles: [],
                    inputs: ['bid']
                }), 
                __metadata('design:paramtypes', [address_1.AddressService])
            ], InfoboxPanelComponent);
            exports_1("InfoboxPanelComponent", InfoboxPanelComponent);
        }
    }
});
//# sourceMappingURL=infobox.js.map