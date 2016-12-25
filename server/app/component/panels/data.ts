import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'data-panel',
  templateUrl: 'panels/data-panel.html',
  styles:[]
	// inputs:['buildingId']
})

export class DataPanelComponent implements OnInit{
    buildingId:string;

    constructor()
    {
    }
    
    ngOnInit()
    {
      console.log("location.pathname is "+location.pathname);
      this.buildingId = location.pathname.split('/')[3];
    }
}