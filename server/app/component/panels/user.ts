import { Component} from '@angular/core';

@Component({
  selector: 'user-panel',
  templateUrl: 'panels/user-panel.html',
  styles:[`
    div.thumbnail{
      height: 100%
    }
  `,
  `
    span{
      display:block;
      margin-top:5px;
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