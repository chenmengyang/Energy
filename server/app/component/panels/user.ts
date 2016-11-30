import { Component} from '@angular/core';

@Component({
  selector: 'user-panel',
  templateUrl: 'panels/user-panel.html',
  styles:[],
	inputs:['user']
})

export class UserPanelComponent{
    user:any;

    constructor()
    {
    }
    
}