import { Component, EventEmitter, AfterContentInit} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Location} from '@angular/common';

@Component({
    selector: 'address-panel',
    templateUrl: 'panels/address-panel.html',
    styles:[],
    inputs:['addressList'],
    outputs:['clickAddress']
})

export class AddressListComponent implements AfterContentInit{
    addressList:any = [];
    selected:any;
    clickAddress:EventEmitter<any> = new EventEmitter();
    constructor(private router:Router,
                private route:ActivatedRoute,
                private location:Location)
    {
        this.selected = this.location.path().split('/')[3];
    }

    ngAfterContentInit()
    {
        
    }

    address_click(addr:any)
    {
        this.selected = addr._id;
        this.clickAddress.emit(addr);
    }
}