import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AddressService} from '../service/address';
import {JanitorService} from '../service/janitor';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

declare var $:any;
@Component({
    templateUrl: "janitor.html",
    providers:[AddressService,JanitorService]
})
export class JanitorComponent {
    private ass:any = [];
    private Janitors:any = [];
    private janitor:any = {};
    private selectedOptions = [];

    private isLoading = true;
    private isEditing:boolean = false;

    private addJanitorForm: FormGroup;
	private account = new FormControl("", Validators.required);
	private password = new FormControl("", Validators.required);
	private email = new FormControl("", Validators.required);
    private phone = new FormControl("", Validators.required);
    private responsibility = new FormControl("", Validators.required);

    constructor(private janitorService:JanitorService,
                private addressService:AddressService,
                private formBuilder: FormBuilder)
    {
    }

    ngOnInit()
    {
        this.loadJanitors();
        this.addJanitorForm = this.formBuilder.group({
			account: this.account,
			password: this.password,
			email: this.email,
            phone: this.phone,
            responsibility: this.responsibility
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
                    // $('#responsibility_selection').multiselect();
                  },
            err=>console.log("error loading address!")
        );
    }

    loadJanitors()
    {
        this.janitorService.getJanitors().subscribe(
            data=>this.Janitors = data,
            err=>console.log("error loading address!")
        );
    }

    submitAdd()
    {
        // console.log("asxasfa:" + JSON.stringify(this.addJanitorForm.value.responsibility));
        let formValue = this.addJanitorForm.value;
        formValue["role"] = "janitor";
        this.janitorService.addJanitor(this.addJanitorForm.value).subscribe(
            res=>{
				var newJanitor = res.json();
				this.Janitors.push(newJanitor);
				this.addJanitorForm.reset();
            },
            err=>console.log(err)
        );
    }

    submitEdit(janitor:any)
    {
        this.janitorService.editJanitors(janitor).subscribe
        (
			res => {
				this.isEditing = false;
				this.janitor = janitor;
			},
			error => console.log(error)
        );
    }

    enableEditing(janitor:any)
    {
		this.isEditing = true;
		this.janitor = janitor;
    }

	cancelEditing() {
		this.isEditing = false;
		this.janitor = {};
		this.loadJanitors();
	}

    submitRemove(janitor:any)
    {
        if(window.confirm("Are you sure you want to permanently delete this item?"))
        {
            this.janitorService.deleteJanitor(janitor).subscribe(
                res => {
					var pos = this.Janitors.map(ee => { return ee._id }).indexOf(janitor._id);
					this.Janitors.splice(pos, 1);
                },
                error => console.log(error)
            );
        }
    }
}