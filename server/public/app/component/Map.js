System.register(['@angular/core', '@angular/router'], function(exports_1, context_1) {
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
    var core_1, router_1;
    var MapComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            MapComponent = class MapComponent {
                constructor(router) {
                    this.router = router;
                    this.title = 'Building markers on the map';
                    this.zoom = 12;
                    this.lat = 51.678418;
                    this.lng = 7.809007;
                    this.markers = [];
                    this.addr = [];
                }
                getCenter() {
                    let lats = [];
                    let lngs = [];
                    this.markers.forEach(m => {
                        lats.push(m.lat);
                        lngs.push(m.lng);
                    });
                    let len = this.markers.length;
                    this.lat = lats.reduce((a, b) => { return (a + b); }) / len;
                    this.lng = lngs.reduce((a, b) => { return (a + b); }) / len;
                }
                view_building() {
                    this.router.navigate(['/Building']);
                }
                ngOnDestroy() {
                    console.log(this.addr);
                }
            };
            MapComponent = __decorate([
                core_1.Component({
                    selector: 'map',
                    templateUrl: 'map.html',
                    styles: [
                        `.sebm-google-map-container {
  height: 500px;
  width: 800px;
}`
                    ],
                    inputs: ['markers', 'lat', 'lng']
                }), 
                __metadata('design:paramtypes', [router_1.Router])
            ], MapComponent);
            exports_1("MapComponent", MapComponent);
        }
    }
});
//# sourceMappingURL=Map.js.map