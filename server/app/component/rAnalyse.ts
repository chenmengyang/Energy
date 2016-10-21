import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AddressService} from '../service/address';
import {ResidentService} from '../service/resident';
// import {JanitorService} from '../service/janitor';
import {LoginService} from '../service/login';
import {EnergyService} from '../service/energy';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

declare var $:any;
@Component({
    templateUrl: "ranalyse.html",
    providers:[AddressService,ResidentService,EnergyService]
})
export class RAnalyseComponent {

    private water_arr = [];
    private heater_arr = [];
    private electricity_arr = [];
    private options_water:HighchartsOptions;
    private options_heater:HighchartsOptions;
    private options_electricity:HighchartsOptions;
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
                            this.water_arr.push([e.period,e.value]);
                        }
                        else if(e.type==="electricity")
                        {
                            this.electricity_arr.push([e.period,e.value]);
                        }
                        else if(e.type==="heater")
                        {
                            this.heater_arr.push([e.period,e.value]);
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
                                            }]
                                        };
                    this.options_heater = {
                                            credits: {enabled: false},
                                            chart : {type: 'column'},
                                            title : { text : 'heater usage demo' },
                                            series: [{
                                                data: this.heater_arr,
                                            }]
                                        };
                    this.options_electricity = {
                                            credits: {enabled: false},
                                            chart : {type: 'spline'},
                                            title : { text : 'electricty usage demo' },
                                            series: [{
                                                data: this.electricity_arr,
                                            }]
                                        };
                },
                err=>console.log(err)
            );
    }
}