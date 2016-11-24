import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AddressService} from '../service/address';
import {ManagerService} from '../service/manager';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

declare var $:any;
@Component({
    templateUrl: "manager.html",
    providers:[AddressService,ManagerService]
})
export class ManagerComponent {
    private ass:any = [];
    private Managers:any = [];
    private manager:any = {};
    private selectedOptions = [];
    private buildings = [];

    private isLoading = true;
    private isEditing:boolean = false;

    private addManagerForm: FormGroup;
	private account = new FormControl("", Validators.required);
	private password = new FormControl("", Validators.required);
	private email = new FormControl("", Validators.required);
    private phone = new FormControl("", Validators.required);
    // private responsibility = new FormControl("", Validators.required);

    constructor(private managerService:ManagerService,
                private addressService:AddressService,
                private formBuilder: FormBuilder)
    {
    }

    ngOnInit()
    {
        this.loadManagers();
        this.addManagerForm = this.formBuilder.group({
			account: this.account,
			password: this.password,
			email: this.email,
            phone: this.phone
            // responsibility: this.responsibility
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
                    console.log("len:"+JSON.stringify(this.ass));
                  },
            err=>console.log("error loading address!")
        );
    }

    loadManagers()
    {
        this.managerService.getManagers().subscribe(
            data=>this.Managers = data,
            err=>console.log("error loading address!")
        );
    }

    submitAdd()
    {
        this.addManagerForm.value["role"] = "manager";
        this.addManagerForm.value["responsibility"] = [];
        this.managerService.addManager(this.addManagerForm.value).subscribe(
            res=>{
				var newManager = res.json();
				this.Managers.push(newManager);
				this.addManagerForm.reset();
            },
            err=>console.log(err)
        );
    }

    submitEdit(manager:any)
    {
        this.managerService.editManagers(manager).subscribe
        (
			res => {
				this.isEditing = false;
				this.manager = manager;
			},
			error => console.log(error)
        );
    }

    enableEditing(manager:any)
    {
		this.isEditing = true;
		this.manager = manager;
    }

	cancelEditing() {
		this.isEditing = false;
		this.manager = {};
		this.loadManagers();
	}

    submitRemove(manager:any)
    {
        if(window.confirm("Are you sure you want to permanently delete this item?"))
        {
            this.managerService.deleteManager(manager).subscribe(
                res => {
					var pos = this.Managers.map(ee => { return ee._id }).indexOf(manager._id);
					this.Managers.splice(pos, 1);
                },
                error => console.log(error)
            );
        }
    }

    private current_managerId:string;

    open_buildings(jid)
    {
        this.current_managerId = jid;
        this.buildings = [];
        this.ass.forEach(a=>{
            a["isSelected"] = false;
        });
        this.managerService.queryManager(jid).subscribe(
            res=>{
                this.buildings = res[0].responsibility;
                this.buildings.forEach(b=>{
                    let tmp = this.ass.filter(x=>{return x._id==b});
                    if (tmp)
                    {
                        tmp[0].isSelected = true;
                    }
                });
            },
            error => console.log(error)
        );
    }

    default_checked(addId)
    {
        return this.buildings.filter(b=>{return b==addId}).length;
    }

    edit_responsibility(event)
    {
        let bvalue = JSON.stringify(event.target.value).replace(/\"/g,"");
        if (event.target.checked)
        {
            if (this.buildings.filter(x=>{return x==bvalue}).length)
            {

            }
            else
            {
                this.buildings.push(bvalue);
            }
        }
        else
        {
            if (this.buildings.filter(x=>{return x==bvalue}).length)
            {
                this.buildings.splice(this.buildings.indexOf(bvalue),1);
            }
        }
    }

    save_buildings()
    {
        this.managerService.editBuildings(this.current_managerId,this.buildings).subscribe(
            res=>(null),
            error=>console.log(error)
        );
    }
}