import { Component} from '@angular/core';

@Component({
  selector: 'data-panel',
  templateUrl: 'panels/data-panel.html',
  styles:[],
	inputs:['buildingId']
})

export class DataPanelComponent{
    buildingId:string;

    constructor()
    {
    }
    
}