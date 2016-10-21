import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {LoginComponent,DashComponent,HistoryComponent,
        DashRComponent,DashJComponent,JSubmitComponent,
        ChartComponent,HelpComponent,AddressComponent,
        JanitorComponent,ResidentComponent,JCheckComponent,
        RAnalyseComponent} from './component'
import {LoginService} from './service/login';
import {enableProdMode} from '@angular/core';
import { ChartModule } from 'angular2-highcharts';
enableProdMode();

const routing = RouterModule.forRoot([
        {path: '', component: LoginComponent},
        {path: 'Dash-admin', component: DashComponent,children:[
            {path:'',component:DashComponent},
            {path:'Address',component:AddressComponent},
            {path:'Janitor',component:JanitorComponent},
            {path:'Resident',component:ResidentComponent}
        ]},
        {path: 'Dash-janitor', component: DashJComponent,children:[
            {path:'',component:DashJComponent},
            {path:'Submission',component:JSubmitComponent},
            {path:'Check',component:JCheckComponent},
        ]},
        {path: 'Dash-resident', component: DashRComponent,children:[
            {path:'',component:DashRComponent},
            {path:'Analyse',component:RAnalyseComponent},
            {path:'History',component:null},
        ]},
        {path: 'History', component: HistoryComponent},
        {path: 'Chart', component: ChartComponent},
        {path: 'Help', component: HelpComponent}
]);

@NgModule({
    imports: [BrowserModule,
              ChartModule,
    		  routing,
    		  HttpModule,
    		  FormsModule,
    		  ReactiveFormsModule],
    declarations: [AppComponent,
                   DashComponent,
                   DashJComponent,
                   DashRComponent,
                   HistoryComponent,
                   ChartComponent,
                   HelpComponent,
    			   LoginComponent,
                   AddressComponent,
                   JanitorComponent,
                   ResidentComponent,
                   JSubmitComponent,
                   JCheckComponent,
                   RAnalyseComponent],
    providers: [LoginService],
    bootstrap: [AppComponent]
})

export class AppModule {}
