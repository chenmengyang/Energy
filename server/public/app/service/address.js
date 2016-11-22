System.register(['@angular/core', '@angular/http', 'rxjs/add/operator/map'], function(exports_1, context_1) {
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
    var core_1, http_1;
    var AddressService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            AddressService = class AddressService {
                constructor(http, jsonp) {
                    this.http = http;
                    this.jsonp = jsonp;
                }
                getAddresses() {
                    return this.http.get('/api/address').map(res => res.json());
                }
                getCoordinator(address) {
                    let params = new http_1.URLSearchParams();
                    params.set('address', 'Insinoorinkatu+60,+Tampere,+Finland');
                    params.set('key', 'AIzaSyB7yy-d44nqqVi0gwt_3XzjH_sbqSGOra8');
                    params.set('callback', 'JSONP_CALLBACK');
                    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address))
                        .map(res => res.json())
                        .map(result => {
                        if (result.status !== "OK") {
                            throw new Error("unable to geocode address");
                        }
                        let latitude = result.results[0].geometry.location.lat;
                        let longitude = result.results[0].geometry.location.lng;
                        return { 'lat': latitude, 'lng': longitude };
                    });
                    // .map(res=><string[]> res.json()[1]);
                }
                addAddress(addr) {
                    let headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this.http.post("/api/address", JSON.stringify(addr), { headers: headers });
                }
                editAddress(addr) {
                    let headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this.http.put("/api/address/" + addr._id, JSON.stringify(addr), { headers: headers });
                }
                deleteAddress(addr) {
                    let headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    var options = new http_1.RequestOptions({ body: '', headers: headers });
                    // var options = new RequestOptions({ body: '', headers: headers});
                    return this.http.delete("/api/address/" + addr._id, options);
                }
            };
            AddressService = __decorate([
                core_1.Injectable(), 
                __metadata('design:paramtypes', [http_1.Http, http_1.Jsonp])
            ], AddressService);
            exports_1("AddressService", AddressService);
        }
    }
});
//# sourceMappingURL=address.js.map