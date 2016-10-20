import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AddressService} from '../service/address'
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
    templateUrl: "address.html",
    providers:[AddressService]
})
export class AddressComponent {
    private Addresses:any=[];
    private addr:any = {};

	private isLoading = true;
	private isEditing = false;

    private addAddressForm: FormGroup;
	private name = new FormControl("", Validators.required);
	private country = new FormControl("", Validators.required);
	private city = new FormControl("", Validators.required);
    private street = new FormControl("", Validators.required);
    private building = new FormControl("", Validators.required);
    private block = new FormControl("", Validators.required);

    constructor(private addressService:AddressService,
                private formBuilder: FormBuilder)
    {
    }

    ngOnInit()
    {
        this.loadAddress();
        this.addAddressForm = this.formBuilder.group({
			name: this.name,
			country: this.country,
			city: this.city,
            street: this.street,
            building: this.building,
            block: this.block
		});
    }

    //
    loadAddress()
    {
        this.addressService.getAddresses().subscribe(
            data=>this.Addresses = data,
            err=>console.log("error loading address!")
        );
    }
    //
    submitAdd()
    {
        // console.log(this.addAddressForm.value);
        this.addressService.addAddress(this.addAddressForm.value).subscribe(
            res=>{
				var newAddr = res.json();
				this.Addresses.push(newAddr);
				this.addAddressForm.reset();
            },
            err=>console.log(err)
        );
    }
    //
    submitEdit(addr:any)
    {
        this.addressService.editAddress(addr).subscribe(
			res => {
				this.isEditing = false;
				this.addr = addr;
				// this.sendInfoMsg("item edited successfully.", "success");
			},
			error => console.log(error)
        );
    }
    //
    enableEditing(addr:any)
    {
		this.isEditing = true;
		this.addr = addr;
    }
    //
	cancelEditing() {
		this.isEditing = false;
		this.addr = {};
		// this.sendInfoMsg("item editing cancelled.", "warning");
		// reload the cats to reset the editing
		this.loadAddress();
	}
    //
    submitRemove(addr)
    {
        if(window.confirm("Are you sure you want to permanently delete this item?"))
        {
            this.addressService.deleteAddress(addr).subscribe(
                res => {
					var pos = this.Addresses.map(ee => { return ee._id }).indexOf(addr._id);
					this.Addresses.splice(pos, 1);
                },
                error => console.log(error)
            );
        }
    }
}