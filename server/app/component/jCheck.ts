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
    templateUrl: "jcheck.html",
    providers:[AddressService,ResidentService,EnergyService]
})
export class JCheckComponent {
    private residents:any = [];
    // private types = ['water','heater','electricity'];
    private Energys:any = [];

    private isLoading = true;
    private isEditing:boolean = false;

    private searchForm: FormGroup;
    private resident = new FormControl("", Validators.required);

    constructor(private residentService:ResidentService,
                private energyService:EnergyService,
                private addressService:AddressService,
                private loginService:LoginService,
                private formBuilder: FormBuilder)
    {
        console.log("aiyiai");
    }

    ngOnInit()
    {
        this.loadEnergys();
        this.searchForm = this.formBuilder.group({
			resident: this.resident
		});
    }

    loadEnergys()
    {
        this.energyService.getEnergyByAddress("all",this.loginService.getResponsibilty())
            .subscribe(
                data=>{
                        this.Energys=data;
                      },
                err=>console.log("error loadEnergys!")
            );
    }

    loadEnergysByResident(rid:string)
    {
        this.energyService.getEnergyByResident("all",rid)
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

    search()
    {
        this.loadEnergysByResident(this.searchForm.value.resident);
    }

}