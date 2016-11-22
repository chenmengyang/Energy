import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AddressService} from '../service/address';
import {ResidentService} from '../service/resident';
// import {JanitorService} from '../service/janitor';
import {LoginService} from '../service/login';
import {EnergyService} from '../service/energy';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
// import {CHART_DIRECTIVES} from 'angular2-highcharts'; 

declare var $:any;
@Component({
    templateUrl: "ranalyse.html",
    // directives: [CHART_DIRECTIVES],
    providers:[AddressService,ResidentService,EnergyService],
    styles: [`
      chart {
        display: block;
      }
    `
    ]
})
export class RAnalyseComponent {

    private water_arr = [];
    private heater_arr = [];
    private electricity_arr = [];
    private options_water:any;
    private options_heater:any;
    private options_electricity:any;
    constructor(private energyService:EnergyService,
                private loginService:LoginService)
    {
        this.load_data();
    }

    load_data()
    {
        this.energyService.getEnergyByResident("all",this.loginService.getUser()._id)
            .subscribe(
                data=>{
                    data.forEach(e=>{
                        if(e.type==="water")
                        {
                            this.water_arr.push([Date.UTC(e.period.substr(0,4),e.period.substr(5,7)),e.value]);
                        }
                        else if(e.type==="electricity")
                        {
                            this.electricity_arr.push([Date.UTC(e.period.substr(0,4),e.period.substr(5,7)),e.value]);
                        }
                        else if(e.type==="heater")
                        {
                            this.heater_arr.push([Date.UTC(e.period.substr(0,4),e.period.substr(5,7)),e.value]);
                        }
                        else
                        {
                            console.log("unknow record type");
                        }
                    });
                    this.options_water = {
                                            credits: {enabled: false},
                                            chart : {type: 'line'},
                                            title : { text : 'Water usage demo' },
                                            series: [{
                                                data: this.water_arr,
                                            }],
                                            xAxis: {type: 'datetime'}
                                        };
                    this.options_heater = {
                                            credits: {enabled: false},
                                            chart : {type: 'column'},
                                            title : { text : 'heater usage demo' },
                                            series: [{
                                                data: this.heater_arr,
                                            }],
                                            xAxis: {type: 'datetime'}
                                        };
                    this.options_electricity = {
                                            credits: {enabled: false},
                                            chart : {type: 'spline'},
                                            title : { text : 'electricty usage demo' },
                                            series: [{
                                                data: this.electricity_arr,
                                            }],
                                            xAxis: {type: 'datetime'}
                                        };
                },
                err=>console.log(err)
            );
    }
}