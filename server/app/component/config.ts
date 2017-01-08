import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../service/login';
import {RuleService} from '../service/rule';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
    templateUrl: 'config.html',
    providers:[RuleService],
    styles:[
        `
        div.row{
            
        }
        `
    ]
})
export class ConfigComponent implements OnInit
{
    private user:any;
    private Rules:any = [];
    private rule:any = {};
    private isEditing:boolean = false;

    private addRuleForm: FormGroup;
	private type = new FormControl("", Validators.required);
	private level = new FormControl("", Validators.required);
	private threshold = new FormControl("", Validators.required);

    private types:any = ['water','heater','electricity'];
    private levels:any = ['success','warning','danger'];

    constructor(private loginService:LoginService
               ,private formBuilder: FormBuilder
               ,private ruleService:RuleService)
    {
        this.user = loginService.getUser();
    }

    ngOnInit()
    {
        this.loadRules();
        this.addRuleForm = this.formBuilder.group({
			type: this.type,
			level: this.level,
			threshold: this.threshold
		});
    }

    enableEditing(rule:any)
    {
		this.isEditing = true;
		this.rule = rule;
    }

    submitRemove(rule:any)
    {
        if(window.confirm("Are you sure you want to permanently delete this item?"))
        {
            this.ruleService.deleteRule(rule).subscribe(
                res =>
                {
					var pos = this.Rules.map(ee => { return ee._id }).indexOf(rule._id);
					this.Rules.splice(pos, 1);
                },
                error => console.log(error)
            );
        }
    }

    submitEdit(rule:any)
    {
        this.ruleService.editRule(rule).subscribe
        (
			res => {
				this.isEditing = false;
				this.rule = rule;
			},
			error => console.log(error)
        );
    }

    cancelEditing()
    {
		this.isEditing = false;
		this.rule = {};
		this.loadRules();
    }

    loadRules()
    {
        this.ruleService.getRule().subscribe(
            data=>this.Rules = data,
            err=>console.log("error loading address!")
        );
    }

    submitAdd()
    {
        this.ruleService.addRule(this.addRuleForm.value).subscribe(
            res=>{
				var newRule = res.json();
				this.Rules.push(newRule);
				this.addRuleForm.reset();
            },
            err=>console.log(err)
        );
    }

}