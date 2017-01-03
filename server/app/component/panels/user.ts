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
      max-width:200px;
      margin-top:10px;
      overflow:hidden;
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