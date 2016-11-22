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
    var JanitorService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            JanitorService = class JanitorService {
                constructor(http) {
                    this.http = http;
                }
                getJanitors() {
                    return this.http.get('/api/janitors').map(res => res.json());
                }
                addJanitor(janitor) {
                    let headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this.http.post("/api/janitors", JSON.stringify(janitor), { headers: headers });
                }
                editJanitors(janitor) {
                    let headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this.http.put("/api/janitors/" + janitor._id, JSON.stringify(janitor), { headers: headers });
                }
                deleteJanitor(janitor) {
                    let headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    var options = new http_1.RequestOptions({ body: '', headers: headers });
                    // var options = new RequestOptions({ body: '', headers: headers});
                    return this.http.delete("/api/janitors/" + janitor._id, options);
                }
            };
            JanitorService = __decorate([
                core_1.Injectable(), 
                __metadata('design:paramtypes', [http_1.Http])
            ], JanitorService);
            exports_1("JanitorService", JanitorService);
        }
    }
});
//# sourceMappingURL=janitor.js.map