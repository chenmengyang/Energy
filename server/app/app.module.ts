import {NgModule, ApplicationRef} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule, JsonpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {LoginComponent,DashComponent,HistoryComponent,
        DashRComponent,DashJComponent,JSubmitComponent,
        HelpComponent,AddressComponent,//ChartComponent
        JanitorComponent,ResidentComponent,JCheckComponent,
        RAnalyseComponent,MapComponent,mapAdminComponent,
        ManagerComponent,BuildingComponent,AddressListComponent,
        UserPanelComponent,DataPanelComponent,DashMComponent,
        InfoboxPanelComponent} from './component'
import {LoginService} from './service/login';
import {enableProdMode} from '@angular/core';
import { ChartModule } from 'angular2-highcharts';
import { AgmCoreModule } from 'angular2-google-maps/core';
import {Ng2PaginationModule} from 'ng2-pagination';

enableProdMode();

const routing = RouterModule.forRoot([
        {path: '', component: LoginComponent},
        {path: 'Dash-admin', component: DashComponent,children:[
            {path:'',component:DashComponent},
            {path:'Map',component:MapComponent},
            {path:'Address',component:AddressComponent},
            {path:'Janitor',component:JanitorComponent},
            {path:'Managers',component:ManagerComponent},
            {path:'Residents',component:ResidentComponent}
        ]},
        {path: 'Dash-janitor', component: DashJComponent,children:[
            {path:'',component:DashJComponent},
            {path:'Map',component:MapComponent},
            {path:'Submission',component:JSubmitComponent},
            {path:'Check',component:null}, //JCheckComponent
        ]},
        {path: 'Dash-manager', component: DashMComponent,children:[
            {path:'',component:DashMComponent},
            {path:'Map',component:MapComponent},
            {path:'Submission',component:null},
            {path:'Check',component:null},
        ]},
        {path: 'History', component: HistoryComponent},
        // {path: 'Chart', component: ChartComponent},
        {path: 'Help', component: HelpComponent},
        {path: 'Building/:id', component: BuildingComponent,children:[
            // {path:'',component:BuildingComponent},
            // {path:'Data/:id',component:DataPanelComponent}
        ]}
]);

@NgModule({
    imports: [BrowserModule,
              ChartModule,
    		  routing,
    		  HttpModule,
              JsonpModule,
    		  FormsModule,
    		  ReactiveFormsModule,
              Ng2PaginationModule,
              AgmCoreModule.forRoot({
                apiKey: 'AIzaSyB7yy-d44nqqVi0gwt_3XzjH_sbqSGOra8'
              })
    ],
    declarations: [AppComponent,
                   DashComponent,
                   DashJComponent,
                   DashRComponent,
                   DashMComponent,
                   HistoryComponent,
                //    ChartComponent,
                   HelpComponent,
    			   LoginComponent,
                   AddressComponent,
                   JanitorComponent,
                   ManagerComponent,
                   ResidentComponent,
                   JSubmitComponent,
                   JCheckComponent,
                   RAnalyseComponent,
                   MapComponent,
                   mapAdminComponent,
                   BuildingComponent,
                   AddressListComponent,
                   UserPanelComponent,
                   DataPanelComponent,
                   InfoboxPanelComponent],
    providers: [LoginService],
    bootstrap: [AppComponent]
})

export class AppModule {}
