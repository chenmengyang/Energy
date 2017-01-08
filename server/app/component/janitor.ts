import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AddressService} from '../service/address';
import {JanitorService} from '../service/janitor';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

declare var $:any;
@Component({
    templateUrl: "janitor.html",
    providers:[AddressService,JanitorService],
    styles:[
        `
        div.checkbox{
            position:relative;
        }
        `
        ,
        `
        div.checkbox input{
            position:absolute;
            left:30px;
        }
        `,
        `
        span.res{
            display:block;
            width:200px;
            text-align:left;
            padding-left:28px;
        }
        `
    ]
})
export class JanitorComponent {
    private ass:any = [];
    private Janitors:any = [];
    private janitor:any = {};
    private selectedOptions = [];
    private buildings = [];

    private isLoading = true;
    private isEditing:boolean = false;

    private addJanitorForm: FormGroup;
	private account = new FormControl("", Validators.required);
	private password = new FormControl("", Validators.required);
	private email = new FormControl("", Validators.required);
    private phone = new FormControl("", Validators.required);
    // private responsibility = new FormControl("", Validators.required);

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
            phone: this.phone
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

    loadJanitors()
    {
        this.janitorService.getJanitors().subscribe(
            data=>this.Janitors = data,
            err=>console.log("error loading address!")
        );
    }

    submitAdd()
    {
        this.addJanitorForm.value["role"] = "janitor";
        this.addJanitorForm.value["responsibility"] = [];
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

    private current_janitorId:string;

    open_buildings(jid)
    {
        this.current_janitorId = jid;
        this.buildings = [];
        this.ass.forEach(a=>{
            a["isSelected"] = false;
        });
        this.janitorService.queryJanitor(jid).subscribe(
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
        this.janitorService.editBuildings(this.current_janitorId,this.buildings).subscribe(
            res=>(null),
            error=>console.log(error)
        );
    }
}