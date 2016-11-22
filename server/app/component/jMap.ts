import { Component, OnDestroy} from '@angular/core';
import {AddressService} from '../service/address';

@Component({
  selector: 'Janitor-map',
  templateUrl: 'jmap.html',
  styles:[
      `.sebm-google-map-container {
  height: 500px;
  width: 800px;
}`
  ],
  providers:[AddressService]
})

export class JMapComponent implements OnDestroy{

  title: string = 'My first angular2-google-maps project';
	zoom: number = 12;
  lat: number = 51.678418;
  lng: number = 7.809007;
  markers: marker[] = [
	  // {
		//   lat: 51.673858,
		//   lng: 7.815982,
		//   label: 'A',
		//   draggable: false
	  // },
	  // {
		//   lat: 51.373858,
		//   lng: 7.215982,
		//   label: 'B',
		//   draggable: false
	  // },
	  // {
		//   lat: 51.723858,
		//   lng: 7.895982,
		//   label: 'C',
		//   draggable: false
	  // }
  ]

	addr:any = [];

  constructor(private _addressService:AddressService)
  {
			_addressService.getAddresses().subscribe(
				a => {
					a.map(addrx=>{
						// console.log(addrx);
						let addString = addrx.street+","+addrx.city+","+addrx.country
						_addressService.getCoordinator(addString).subscribe(
							c=>{
								let tmp = <marker>c;
								tmp['draggable'] = false;
								tmp['label'] = addrx.name;
								
								this.markers.push(tmp);
								this.getCenter();
							}
						)
					});
				},
				err => {console.log(err);}
			)
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

	ngOnDestroy()
	{
		console.log(this.addr);
	}
}



// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}