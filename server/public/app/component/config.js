System.register(['@angular/core', '../service/login', '../service/rule', '@angular/forms'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, login_1, rule_1, forms_1;
    var ConfigComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (login_1_1) {
                login_1 = login_1_1;
            },
            function (rule_1_1) {
                rule_1 = rule_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }],
        execute: function() {
            ConfigComponent = class ConfigComponent {
                constructor(loginService, formBuilder, ruleService) {
                    this.loginService = loginService;
                    this.formBuilder = formBuilder;
                    this.ruleService = ruleService;
                    this.Rules = [];
                    this.rule = {};
                    this.isEditing = false;
                    this.type = new forms_1.FormControl("", forms_1.Validators.required);
                    this.level = new forms_1.FormControl("", forms_1.Validators.required);
                    this.threshold = new forms_1.FormControl("", forms_1.Validators.required);
                    this.types = ['water', 'heater', 'electricity'];
                    this.levels = ['success', 'warning', 'danger'];
                    this.user = loginService.getUser();
                }
                ngOnInit() {
                    this.loadRules();
                    this.addRuleForm = this.formBuilder.group({
                        type: this.type,
                        level: this.level,
                        threshold: this.threshold
                    });
                }
                enableEditing(rule) {
                    this.isEditing = true;
                    this.rule = rule;
                }
                submitRemove(rule) {
                    if (window.confirm("Are you sure you want to permanently delete this item?")) {
                        this.ruleService.deleteRule(rule).subscribe(res => {
                            var pos = this.Rules.map(ee => { return ee._id; }).indexOf(rule._id);
                            this.Rules.splice(pos, 1);
                        }, error => console.log(error));
                    }
                }
                submitEdit(rule) {
                    this.ruleService.editRule(rule).subscribe(res => {
                        this.isEditing = false;
                        this.rule = rule;
                    }, error => console.log(error));
                }
                cancelEditing() {
                    this.isEditing = false;
                    this.rule = {};
                    this.loadRules();
                }
                loadRules() {
                    this.ruleService.getRule().subscribe(data => this.Rules = data, err => console.log("error loading address!"));
                }
                submitAdd() {
                    this.ruleService.addRule(this.addRuleForm.value).subscribe(res => {
                        var newRule = res.json();
                        this.Rules.push(newRule);
                        this.addRuleForm.reset();
                    }, err => console.log(err));
                }
            };
            ConfigComponent = __decorate([
                core_1.Component({
                    templateUrl: 'config.html',
                    providers: [rule_1.RuleService],
                    styles: [
                        `
        div.row{
            
        }
        `
                    ]
                }), 
                __metadata('design:paramtypes', [login_1.LoginService, forms_1.FormBuilder, rule_1.RuleService])
            ], ConfigComponent);
            exports_1("ConfigComponent", ConfigComponent);
        }
    }
});
//# sourceMappingURL=config.js.map