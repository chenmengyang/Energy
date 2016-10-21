System.register(['@angular/core', '@angular/http'], function(exports_1, context_1) {
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
    var ResidentService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            let ResidentService = class ResidentService {
                constructor(http) {
                    this.http = http;
                }
                getResidents() {
                    return this.http.get('/api/residents').map(res => res.json());
                }
                getResidentByAddress() {
                    return this.http.get('/api/residents').map(res => res.json());
                }
                getResById(rid) {
                    return this.http.get(`/api/residents/${rid}`).map(res => res.json());
                }
                addResident(resident) {
                    let headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this.http.post("/api/janitors", JSON.stringify(resident), { headers: headers });
                }
                editResident(resident) {
                    let headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this.http.put("/api/janitors/" + resident._id, JSON.stringify(resident), { headers: headers });
                }
                deleteResident(resident) {
                    let headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    var options = new http_1.RequestOptions({ body: '', headers: headers });
                    // var options = new RequestOptions({ body: '', headers: headers});
                    return this.http.delete("/api/janitors/" + resident._id, options);
                }
            };
            ResidentService = __decorate([
                core_1.Injectable(), 
                __metadata('design:paramtypes', [http_1.Http])
            ], ResidentService);
            exports_1("ResidentService", ResidentService);
        }
    }
});
//# sourceMappingURL=resident.js.map