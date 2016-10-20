import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {LoginComponent,DashComponent,HistoryComponent,
    ChartComponent,HelpComponent} from './component'
import {LoginService} from './service/login';
// import {HeadersService} from './service/header';
import {enableProdMode} from '@angular/core';
enableProdMode();

const routing = RouterModule.forRoot([
        {path: '', component: LoginComponent},
        // {path: 'Dashboards', component: HomeComponent,children:[
        //     {path:'',component:HomeComponent},
        //     {path:'Summary',component:DashSummaryComponent},
        //     {path:'Alert',component:DashAlertComponent},
        //     {path:'Mango',component:DashMangoComponent}
        // ]},
        {path: 'Dash', component: DashComponent},
        {path: 'History', component: HistoryComponent},
        {path: 'Chart', component: ChartComponent},

        // {path: 'Profile', component: ProfileComponent,children:[
        //     {path: '', component: ProfileDetailComponent},
        //     {path: 'Detail', component: ProfileDetailComponent},
        //     {path: 'Usage', component: ProfileUsageComponent},
        // ]},
        //
        {path: 'Help', component: HelpComponent}
]);

@NgModule({
    imports: [BrowserModule,
    		  routing,
    		  HttpModule,
    		  FormsModule,
    		  ReactiveFormsModule],
    declarations: [AppComponent,
                   DashComponent,
                   HistoryComponent,
                   ChartComponent,
                   HelpComponent,
    			   LoginComponent],
    providers: [LoginService],
    bootstrap: [AppComponent]
})

export class AppModule {}
