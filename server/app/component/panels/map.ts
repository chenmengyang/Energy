import { Component, OnDestroy} from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'map-panel',
  templateUrl: './panels/map-panel.html',
  styles:[
      `.sebm-google-map-container {
  height: 500px;
  width: 800px;
}`
  ],
	inputs:['markers','lat','lng']
})

export class MapComponent implements OnDestroy{

  title: string = 'Building markers on the map';
	zoom: number = 12;
  lat: number = 51.678418;
  lng: number = 7.809007;
  markers: marker[] = [
  ]

	addr:any = [];

  constructor(private router:Router)
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
		this.router.navigate(['/Building/Data/'+mid]);
	}

	ngOnDestroy()
	{
		console.log(this.addr);
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