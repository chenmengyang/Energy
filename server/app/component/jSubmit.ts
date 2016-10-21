import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AddressService} from '../service/address';
import {ResidentService} from '../service/resident';
// import {JanitorService} from '../service/janitor';
import {LoginService} from '../service/login';
import {EnergyService} from '../service/energy';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

declare var $:any;
@Component({
    templateUrl: "jsubmit.html",
    providers:[AddressService,ResidentService,EnergyService]
})
export class JSubmitComponent {
    private residents:any = [];
    private types = ['water','heater','electricity'];
    private Energys:any = [];
    private energy:any = {};

    private isLoading = true;
    private isEditing:boolean = false;

    private addEnergyForm: FormGroup;
	private period = new FormControl("", Validators.required);
	private type = new FormControl("", Validators.required);
	private value = new FormControl("", Validators.required);
    private resident = new FormControl("", Validators.required);

    private time = (new Date()).toISOString().substr(0,7);

    constructor(private residentService:ResidentService,
                private energyService:EnergyService,
                private addressService:AddressService,
                private formBuilder: FormBuilder,
                private loginService:LoginService)
    {

    }

    ngOnInit()
    {
        this.loadEnergys();
        this.addEnergyForm = this.formBuilder.group({
			resident: this.resident,
			period: this.period,
			type: this.type,
            value: this.value
		});
    }

    loadEnergys()
    {
        this.energyService.getEnergyByAddress(this.time,this.loginService.getResponsibilty())
            .subscribe(
                data=>{
                        this.Energys=data;
                        console.log("data:"+JSON.stringify(data['resident']));
                      },
                err=>console.log("error loadEnergys!")
            );
    }
    
    ngAfterViewInit()
    {
        this.loadRes();
    }

    loadRes()
    {
       this.residentService.getResidentByAddress().subscribe(
            data=>{
                    this.residents = data;
                  },
            err=>console.log("error loadRes!")
        );
    }

    submitAdd()
    {
        let formValue = this.addEnergyForm.value;
        // formValue["role"] = "janitor";
        this.energyService.addEnergy(this.addEnergyForm.value).subscribe(
            res=>{
				var newEnergy = res.json();
				this.Energys.push(newEnergy);
				this.addEnergyForm.reset();
            },
            err=>console.log(err)
        );
    }

    submitEdit(energy:any)
    {
        this.energyService.editEnergy(energy).subscribe
        (
			res => {
				this.isEditing = false;
				this.energy = energy;
			},
			error => console.log(error)
        );
    }

    enableEditing(energy:any)
    {
		this.isEditing = true;
		this.energy = energy;
    }

	cancelEditing() {
		this.isEditing = false;
		this.energy = {};
		this.loadEnergys();
	}

    submitRemove(energy:any)
    {
        if(window.confirm("Are you sure you want to permanently delete this item?"))
        {
            this.energyService.deleteEnergy(energy).subscribe(
                res => {
					var pos = this.Energys.map(ee => { return ee._id }).indexOf(energy._id);
					this.Energys.splice(pos, 1);
                },
                error => console.log(error)
            );
        }
    }
}