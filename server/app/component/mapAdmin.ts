import {Component, CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AddressService} from '../service/address';
import {MapComponent} from './Map'

@Component({
    template:`
    <map [markers]="buildings" [lat]="lat" [lng]="lng"> </map>
    `,
    providers:[AddressService],
    
    // providers:[UserService]
})
export class mapAdminComponent {

    private buildings = [];
    private lat:number;
    private lng:number;

    private colors = ['green','red','yellow'];

    constructor(private addressService:AddressService)
    {
        addressService.getAddresses().subscribe(
            a => {
                a.map(addrx=>{
                    // console.log(addrx);
                    let addString = addrx.street+","+addrx.city+","+addrx.country
                    addressService.getCoordinator(addString).subscribe(
                        c=>{
                            let tmp = <marker>c;
                            tmp['draggable'] = false;
                            tmp['label'] = addrx.name;
                            let index = Math.floor(Math.random()*3);
                            tmp['icon'] = `/image/mm_20_${this.colors[index]}.png`;
                            
                            this.buildings.push(tmp);
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
		this.buildings.forEach(m=>{
			lats.push(m.lat);
			lngs.push(m.lng);
		});
		let len = this.buildings.length;
		this.lat = lats.reduce((a,b)=>{return (a+b)})/len;
		this.lng = lngs.reduce((a,b)=>{return (a+b)})/len;
	}
}

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
    icon?: string;
}