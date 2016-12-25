import { Component, OnDestroy, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import {LoginService} from '../../service/login';
import {AddressService} from '../../service/address';

@Component({
  selector: 'map-panel',
  templateUrl: './panels/map-panel.html',
  styles:[
      `.sebm-google-map-container {
  height: 500px;
  width: 800px;
}
`
  ],
  providers:[AddressService]
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
	private colors = ['green','red','yellow'];
	// private options;
	addr:any = [];

  constructor(private router:Router,
							private loginService:LoginService,
							private addressService:AddressService)
  {
	// this.options = {
	// 			title : { text : 'simple chart' },
	// 			series: [{
	// 				data: [29.9, 71.5, 106.4, 129.2],
	// 			}]
	// 		};
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
								let index = Math.floor(Math.random()*3);
								tmp['icon'] = `/image/mm_20_${this.colors[index]}.png`;
								this.markers.push(tmp);
								this.getCenter();
							}
						)
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
									let index = Math.floor(Math.random()*3);
									tmp['icon'] = `/image/mm_20_${this.colors[index]}.png`;
									this.markers.push(tmp);
									this.getCenter();
								}
							)
						}
					)
			});
		}
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
		// console.log(this.addr);
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