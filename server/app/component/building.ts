import {Component, OnInit} from '@angular/core';
import {AddressListComponent} from './panels/addressList';
import {UserPanelComponent} from './panels/user';
import {LoginService} from '../service/login';
import {AddressService} from '../service/address';
import { Router} from '@angular/router';

@Component({
    templateUrl: "building.html",
    providers:[AddressService]
})
export class BuildingComponent implements OnInit {
    addresses:any[] = [];
    selected_address:any = {"name":"..."};
    user:any;

    ngOnInit()
    {

    }

    constructor(private loginService:LoginService,
                private addressService:AddressService,
                private route:Router)
    {
        this.user = loginService.getUser();
        addressService.getAddresses().subscribe(
            a => {
                this.addresses = a;
            },
            err => {console.log(err);}
        );
    }

    switch_address(msg:any)
    {
        this.selected_address = msg;
        this.route.navigate([`/Building/Data/${this.selected_address._id}`]);
    }
}