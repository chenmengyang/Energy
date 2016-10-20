import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ResidentService} from '../service/resident';
import {AddressService} from '../service/address';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
    templateUrl: "resident.html",
    providers:[ResidentService,AddressService]
})
export class ResidentComponent {
    private ass:any = [];
    private Residents:any = [];
    private resident:any = {};

    private isLoading = true;
    private isEditing:boolean = false;

    private addResidentForm: FormGroup;
	private account = new FormControl("", Validators.required);
	private password = new FormControl("", Validators.required);
	private email = new FormControl("", Validators.required);
    private phone = new FormControl("", Validators.required);
    private address = new FormControl("", Validators.required);
    private room = new FormControl("", Validators.required);

    constructor(private residentService:ResidentService,
                private addressService:AddressService,
                private formBuilder: FormBuilder)
    {        
    }

    ngOnInit()
    {
        this.loadResidents();
        this.addResidentForm = this.formBuilder.group({
			account: this.account,
			password: this.password,
			email: this.email,
            phone: this.phone,
            address: this.address,
            room: this.room
		});
    }

    ngAfterViewInit()
    {
        this.loadAss();
    }

    loadAss()
    {
        return this.addressService.getAddresses().subscribe(
            data=>{
                    this.ass = data;
                    console.log("len:"+this.ass.length);
                  },
            err=>console.log("error loading address!")
        );
    }

    loadResidents()
    {
        this.residentService.getResidents().subscribe(
            data=>this.Residents = data,
            err=>console.log("error loading address!")
        );
    }

    submitAdd()
    {
        let formValue = this.addResidentForm.value;
        formValue["role"] = "resident";
        this.residentService.addResident(this.addResidentForm.value).subscribe(
            res=>{
				var newResident = res.json();
				this.Residents.push(newResident);
				this.addResidentForm.reset();
            },
            err=>console.log(err)
        );
    }

    submitEdit(resident:any)
    {
        this.residentService.editResident(resident).subscribe
        (
			res => {
				this.isEditing = false;
				this.resident = resident;
			},
			error => console.log(error)
        );
    }

    enableEditing(resident:any)
    {
		this.isEditing = true;
		this.resident = resident;
    }

	cancelEditing() {
		this.isEditing = false;
		this.resident = {};
		this.loadResidents();
	}

    submitRemove(resident:any)
    {
        if(window.confirm("Are you sure you want to permanently delete this item?"))
        {
            this.residentService.deleteResident(resident).subscribe(
                res => {
					var pos = this.Residents.map(ee => { return ee._id }).indexOf(resident._id);
					this.Residents.splice(pos, 1);
                },
                error => console.log(error)
            );
        }
    }
}