System.register(['@angular/core', '@angular/platform-browser', '@angular/router', '@angular/http', '@angular/forms', './app.component', './component', './service/login', 'angular2-highcharts'], function(exports_1, context_1) {
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
    var core_1, platform_browser_1, router_1, http_1, forms_1, app_component_1, component_1, login_1, core_2, angular2_highcharts_1;
    var routing, AppModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            },
            function (login_1_1) {
                login_1 = login_1_1;
            },
            function (angular2_highcharts_1_1) {
                angular2_highcharts_1 = angular2_highcharts_1_1;
            }],
        execute: function() {
            core_2.enableProdMode();
            routing = router_1.RouterModule.forRoot([
                { path: '', component: component_1.LoginComponent },
                { path: 'Dash-admin', component: component_1.DashComponent, children: [
                        { path: '', component: component_1.DashComponent },
                        { path: 'Address', component: component_1.AddressComponent },
                        { path: 'Janitor', component: component_1.JanitorComponent },
                        { path: 'Resident', component: component_1.ResidentComponent }
                    ] },
                { path: 'Dash-janitor', component: component_1.DashJComponent, children: [
                        { path: '', component: component_1.DashJComponent },
                        { path: 'Submission', component: component_1.JSubmitComponent },
                        { path: 'Check', component: component_1.JCheckComponent },
                    ] },
                { path: 'Dash-resident', component: component_1.DashRComponent, children: [
                        { path: '', component: component_1.DashRComponent },
                        { path: 'Analyse', component: component_1.RAnalyseComponent },
                        { path: 'History', component: null },
                    ] },
                { path: 'History', component: component_1.HistoryComponent },
                { path: 'Chart', component: component_1.ChartComponent },
                { path: 'Help', component: component_1.HelpComponent }
            ]);
            let AppModule = class AppModule {
            };
            AppModule = __decorate([
                core_1.NgModule({
                    imports: [platform_browser_1.BrowserModule,
                        angular2_highcharts_1.ChartModule,
                        routing,
                        http_1.HttpModule,
                        forms_1.FormsModule,
                        forms_1.ReactiveFormsModule],
                    declarations: [app_component_1.AppComponent,
                        component_1.DashComponent,
                        component_1.DashJComponent,
                        component_1.DashRComponent,
                        component_1.HistoryComponent,
                        component_1.ChartComponent,
                        component_1.HelpComponent,
                        component_1.LoginComponent,
                        component_1.AddressComponent,
                        component_1.JanitorComponent,
                        component_1.ResidentComponent,
                        component_1.JSubmitComponent,
                        component_1.JCheckComponent,
                        component_1.RAnalyseComponent],
                    providers: [login_1.LoginService],
                    bootstrap: [app_component_1.AppComponent]
                }), 
                __metadata('design:paramtypes', [])
            ], AppModule);
            exports_1("AppModule", AppModule);
        }
    }
});
//# sourceMappingURL=app.module.js.map