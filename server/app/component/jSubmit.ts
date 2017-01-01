import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AddressService} from '../service/address';
// import {JanitorService} from '../service/janitor';
import {LoginService} from '../service/login';
import {EnergyService} from '../service/energy';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

declare var $:any;
@Component({
    templateUrl: "jsubmit.html",
    providers:[AddressService,EnergyService]
})
export class JSubmitComponent {
    private residents:any[] = [];
    private buildings:any[] = [];
    private periodList:any[] = ['01','02','03','04','05','06','07','08','09','10','11','12'];

    private types = ['water','heater','electricity'];
    private Energys:any = [];
    private energy:any = {};

    private isLoading = true;
    private isEditing:boolean = false;

    private addEnergyForm: FormGroup;
	private period = new FormControl("", Validators.required);
	private type = new FormControl("", Validators.required);
	private value = new FormControl("", Validators.required);
    private building = new FormControl("", Validators.required);

    private time = (new Date()).toISOString().substr(0,7);
    private year:string = (new Date()).toISOString().substr(0,4);

    constructor(private energyService:EnergyService,
                private addressService:AddressService,
                private formBuilder: FormBuilder,
                private loginService:LoginService)
    {
        this.periodList.forEach((p,index)=>{
            this.periodList[index] = this.year + '-' + this.periodList[index];
        });
    }

    ngOnInit()
    {
        this.loadEnergys();
        this.addEnergyForm = this.formBuilder.group({
			building: this.building,
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
                        this.Energys.map(x=>{
                            this.addressService.getAddressById(x['building'])
                                .subscribe(addr=>{
                                    x['address'] = addr[0]['name'];
                                })
                        });
                      },
                err=>console.log("error loadEnergys!")
            );
    }
    
    ngAfterViewInit()
    {
        this.loadBuildings();
    }

    loadBuildings()
    {
        this.loginService.getResponsibilty().forEach(aid=>{
            this.addressService.getAddressById(aid)
                .subscribe(addr=>{
                    this.buildings.push(addr[0]);
                    // console.log("this.buildings is "+this.buildings);
                });
        });
    }

    submitAdd()
    {
        let formValue = this.addEnergyForm.value;
        // formValue["role"] = "janitor";
        this.energyService.addEnergy(this.addEnergyForm.value).subscribe(
            res=>{
				var newEnergy = res.json();
                this.addressService.getAddressById(newEnergy["building"])
                    .subscribe(
                        x=>{
                            newEnergy["address"] = x[0]['name'];
                            this.Energys.push(newEnergy);
                        }
                    );
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