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
    var ManagerService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            ManagerService = class ManagerService {
                constructor(http) {
                    this.http = http;
                }
                getManagers() {
                    return this.http.get('/api/managers').map(res => res.json());
                }
                queryManager(mid) {
                    return this.http.get(`/api/managers/${mid}`).map(res => res.json());
                }
                addManager(manager) {
                    let headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this.http.post("/api/managers", JSON.stringify(manager), { headers: headers });
                }
                editManagers(manager) {
                    let headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this.http.put("/api/managers/" + manager._id, JSON.stringify(manager), { headers: headers });
                }
                editBuildings(mid, buildings) {
                    let headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    console.log("mid:" + mid + " url:" + "/api/janitors/" + mid + "/" + buildings);
                    return this.http.put("/api/managers/buildings/" + mid + "/" + buildings, JSON.stringify(buildings), { headers: headers });
                }
                deleteManager(manager) {
                    let headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    var options = new http_1.RequestOptions({ body: '', headers: headers });
                    // var options = new RequestOptions({ body: '', headers: headers});
                    return this.http.delete("/api/managers/" + manager._id, options);
                }
            };
            ManagerService = __decorate([
                core_1.Injectable(), 
                __metadata('design:paramtypes', [http_1.Http])
            ], ManagerService);
            exports_1("ManagerService", ManagerService);
        }
    }
});
//# sourceMappingURL=manager.js.map