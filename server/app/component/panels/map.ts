import { Component, OnDestroy, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import {LoginService} from '../../service/login';
import {EnergyService} from '../../service/energy';
import {RuleService} from '../../service/rule';
import {AddressService} from '../../service/address';

@Component({
  selector: 'map-panel',
  templateUrl: './panels/map-panel.html',
  styles:
  [
	  `
		.panel-default{
		  margin:0;
	  }
	  `
		,
		`
		.panel-body{
			padding:0;
		}
		`
	  ,
      `.sebm-google-map-container {
		  height:480px;
		  
		}
	`
  ],
  providers:[AddressService,EnergyService,RuleService]
	// inputs:['markers','lat','lng']
})

export class MapComponent implements OnDestroy,OnInit{

  title: string = 'Building markers on the map';
	zoom: number = 12;
	user:any;
  lat: number = 51.678418;
  lng: number = 7.809007;
  markers: marker[] = [
  ];
	private colors = ['danger','warning','success'];
	private rules:any[] = [];

	private water_warning:number;
	private water_danger:number;
	private heater_warning:number;
	private heater_danger:number;
	private electricity_warning:number;
	private electricity_danger:number;
	// private options;
	addr:any = [];
	current_month = (new Date()).toISOString().substr(0,7);

  constructor(private router:Router,
							private loginService:LoginService,
							private addressService:AddressService,
							private energyService:EnergyService,
							private ruleService:RuleService)
  {
		let tmp:marker;
		this.setIcon("585bac6e9e97fc80d06cee3e",tmp);
  }

	ngOnInit()
	{
		this.user = this.loginService.getUser();
		// get markers
		if(this.user.role === "admin")
		{
			this.addressService.getAddresses().subscribe(
				a => {
					a.map(addrx=>{
						let addString = addrx.street+","+addrx.city+","+addrx.country;
						this.addressService.getCoordinator(addString).subscribe(
							c=>{
								let tmp = <marker>c;
								tmp['draggable'] = false;
								tmp['_id'] = addrx._id;
								tmp['label'] = addrx.name;
								// let index = Math.floor(Math.random()*3);
								tmp['icon'] = `/image/success.png`;
								this.markers.push(tmp);
								this.getCenter();
							}
						);
					});
				},
				err => {console.log(err);}
			);
		}
		else
		{
			this.user.responsibility.forEach(aid=>{
				this.addressService.getAddressById(aid)
					.subscribe(
						x=>{
							let addrx = x[0];
							let addString = addrx.street+","+addrx.city+","+addrx.country;
							this.addressService.getCoordinator(addString).subscribe(
								c=>{
									let tmp = <marker>c;
									tmp['draggable'] = false;
									tmp['_id'] = addrx._id;
									tmp['label'] = addrx.name;
									// let index = Math.floor(Math.random()*3);
									tmp['icon'] = `/image/success.png`;
									this.markers.push(tmp);
									this.getCenter();
								}
							)
						}
					)
			});
		}
	}

	setIcon(addressId:string,m:marker)
	{
		if(this.rules.length === 0)
		{
			this.ruleService.getRule().subscribe(
				r => {
					this.rules = r;
					this.water_danger = this.rules.filter(e=>{return e.type==="water"&&e.level==="danger"})[0].threshold;
					this.water_warning = this.rules.filter(e=>{return e.type==="water"&&e.level==="warning"})[0].threshold;
					this.heater_danger = this.rules.filter(e=>{return e.type==="heater"&&e.level==="danger"})[0].threshold;
					this.heater_warning = this.rules.filter(e=>{return e.type==="heater"&&e.level==="warning"})[0].threshold;
					this.electricity_danger = this.rules.filter(e=>{return e.type==="electricity"&&e.level==="danger"})[0].threshold;
					this.electricity_warning = this.rules.filter(e=>{return e.type==="electricity"&&e.level==="warning"})[0].threshold;
					console.log("this.electricity_warning is " + this.electricity_warning);
				}
			);
		}
		else // rules are ready loaded
		{
			this.energyService.getEnergyByAddressType(this.current_month,addressId,"water").
				subscribe(record=>{
				});
		}
	}

	compareValue(aid:string)
	{

	}

	getCenter()
	{
		let lats = [];
		let lngs = [];
		this.markers.forEach(m=>{
			lats.push(m.lat);
			lngs.push(m.lng);
		});
		let len = this.markers.length;
		this.lat = lats.reduce((a,b)=>{return (a+b)})/len;
		this.lng = lngs.reduce((a,b)=>{return (a+b)})/len;
	}

	view_building(mid:string)
	{
		this.router.navigate(['/Building/'+mid]);
	}

	ngOnDestroy()
	{

	}
}

// just an interface for type safety.
interface marker {
	_id: string;
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
	icon?: string;
}