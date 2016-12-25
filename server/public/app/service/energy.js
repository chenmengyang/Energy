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
    var EnergyService;
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
            EnergyService = class EnergyService {
                constructor(http) {
                    this.http = http;
                }
                getEnergyByAddress(time, address) {
                    return this.http.get(`api/energy/time=${time}/address=${address}`).map(res => res.json());
                }
                getEnergyByAddressType(time, address, type) {
                    return this.http.get(`api/energy/time=${time}/address=${address}/type=${type}`).map(res => res.json());
                }
                getEnergyByResident(time, resident) {
                    return this.http.get(`api/energy/time=${time}/resident=${resident}`).map(res => res.json());
                }
                addEnergy(energy) {
                    let headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this.http.post("/api/energy", JSON.stringify(energy), { headers: headers });
                }
                editEnergy(energy) {
                    let headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this.http.put("/api/energy/" + energy._id, JSON.stringify(energy), { headers: headers });
                }
                deleteEnergy(energy) {
                    let headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    var options = new http_1.RequestOptions({ body: '', headers: headers });
                    return this.http.delete("/api/energy/" + energy._id, options);
                }
            };
            EnergyService = __decorate([
                core_1.Injectable(), 
                __metadata('design:paramtypes', [http_1.Http])
            ], EnergyService);
            exports_1("EnergyService", EnergyService);
        }
    }
});
//# sourceMappingURL=energy.js.map