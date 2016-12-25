import { Component,AfterContentInit,OnInit} from '@angular/core';
import {AddressService} from '../../service/address';
import {Router, NavigationStart} from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'infobox-panel',
  templateUrl: 'panels/infobox-panel.html',
  styles:[],
	inputs:['bid']
})

export class InfoboxPanelComponent implements AfterContentInit,OnInit{
    private bid = new Subject<string>();
    messageBox:any[];
    constructor(private addressService:AddressService)
    {

    }

    ngAfterContentInit()
    {
        console.log("bid is "+this.bid);
    }

    ngOnInit()
    {
        this.bid.distinctUntilChanged()
        .subscribe(x=>{
            console.log("x is "+x);
        })
    }
    
}