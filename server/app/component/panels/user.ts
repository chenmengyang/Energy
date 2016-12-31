import { Component} from '@angular/core';

@Component({
  selector: 'user-panel',
  templateUrl: 'panels/user-panel.html',
  styles:[`
    div.thumbnail{
      height: 100%
    }
  `
  ],
	inputs:['user']
})

export class UserPanelComponent{
    user:any;

    constructor()
    {
    }
    
}