import {Component, OnInit} from '@angular/core';
import {AddressListComponent} from './panels/addressList';
import {UserPanelComponent} from './panels/user';
import {LoginService} from '../service/login';
import {AddressService} from '../service/address';
import {EnergyService} from '../service/energy';
import { Router} from '@angular/router';
declare var $: any;
@Component({
    templateUrl: "building.html",
    providers:[AddressService,EnergyService]
})

export class BuildingComponent implements OnInit {
    addresses:any[] = [];
    selected_address:any = {"name":"..."};
    user:any;
    messageBox:any[] = [];
    current_month:any;
    energy_electricity:any=null;
    energy_heater:any=null;
    energy_water:any=null;
    time = (new Date()).toISOString().substr(0,7);
    //
    private chart_option:Object;
    private option_array:any[]=[];
    //
    infoText:string;

    ngOnInit()
    {
        this.refresh_messages(location.pathname.split('/')[2]);
        this.refresh_energy(location.pathname.split('/')[2]);
    }

    constructor(private loginService:LoginService,
                private addressService:AddressService,
                private energyService:EnergyService,
                private route:Router)
    {
        // this.chart_option = {
        //             title : { text : 'simple chart' },
        //             series: [{
        //                 data: [29.9, 71.5, 106.4, 129.2],
        //             }]
        //         };
        this.user = loginService.getUser();
        addressService.getAddresses().subscribe(
            a => {
                this.addresses = a;
            },
            err => {console.log(err);}
        );
    }

    refresh_messages(aid:string)
    {
        this.addressService.getAddressById(aid)
            .subscribe(x=>{
                this.messageBox = x[0].info;
            });
    }

    refresh_energy(aid:string)
    {
        this.energy_electricity = "not submitted yet";
        this.energy_heater = "not submitted yet";
        this.energy_water = "not submitted yet";
        this.energyService.getEnergyByAddress(this.time,aid.split('.'))
            .subscribe(
                x=>{
                    x.forEach(
                        egy=>{
                            if(egy["type"]==="water")
                            {
                                this.energy_water = egy["value"];
                            }
                            else if(egy["type"]==="heater")
                            {
                                this.energy_heater = egy["value"];
                            }
                            else if(egy["type"]==="electricity")
                            {
                                this.energy_electricity = egy["value"];
                            }
                        }
                    )
                }
            )
    }

    switch_address(msg:any)
    {
        this.selected_address = msg;
        this.refresh_messages(this.selected_address._id);
        this.refresh_energy(this.selected_address._id);
        this.route.navigate([`/Building/${this.selected_address._id}`]);
    }

    openModalInfo()
    {
        if(!this.selected_address._id)
        {
            this.selected_address._id = location.pathname.split('/')[2];
        }
        this.infoText = "Please add information for the building";
        $("#infoModal").modal();
    }

    addInfo()
    {
        let info_object = {time:(new Date()).toISOString().substr(0,10),text:this.infoText};
        this.addressService.addAddressInfo(this.selected_address._id,info_object)
            .subscribe((x)=>{
                this.refresh_messages(this.selected_address._id);
            });
        console.log("clicks");
    }

    openModal(event:any)
    {
        if(!this.selected_address._id)
        {
            this.selected_address._id = location.pathname.split('/')[2];
        }
        let target = event.target || event.srcElement || event.currentTarget;
        let btn;
        if(!target.attributes.name)
        {
            btn = target.parentNode;
        }
        else
        {
            btn = target;
        }
        let keyword = btn.attributes.name.nodeValue;
        console.log("keyword is "+keyword);
        this.energyService.getEnergyByAddressType("all",this.selected_address._id,keyword)
            .subscribe(x=>{
                this.option_array = [];
                this.chart_option = {};

                if(x.length)
                {
                    x.forEach(element=>{
                        this.option_array.push([Date.UTC(element.period.substr(0,4),element.period.substr(5,7)),element.value]);
                    });
                    this.chart_option = {
                                            credits: {enabled: false},
                                            chart : {type: 'column'},
                                            title : { text : `${keyword} usage` },
                                            series: [{
                                                data: this.option_array,
                                            }],
                                            xAxis: {type: 'datetime',
                                                    dateTimeLabelFormats:{
                                                        // month: '%e. %b',
                                                        month: '%b %e, %Y'
                                                    },
                                                    title: {text:'Date'}
                                        }
                                        };
                }
                $("#myModal").modal();
            });
        
    }
}