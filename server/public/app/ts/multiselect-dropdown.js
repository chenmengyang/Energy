/*
 * Angular 2 Dropdown Multiselect for Bootstrap
 * Current version: 0.2.0
 *
 * Simon Lindh
 * https://github.com/softsimon/angular-2-dropdown-multiselect
 */
System.register(['@angular/core', '@angular/common', '@angular/forms'], function(exports_1, context_1) {
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
    var core_1, common_1, forms_1;
    var MULTISELECT_VALUE_ACCESSOR, MultiSelectSearchFilter, MultiselectDropdown, MultiselectDropdownModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }],
        execute: function() {
            MULTISELECT_VALUE_ACCESSOR = {
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(() => MultiselectDropdown),
                multi: true
            };
            let MultiSelectSearchFilter = class MultiSelectSearchFilter {
                transform(options, args) {
                    return options.filter((option) => option.name.toLowerCase().indexOf((args || '').toLowerCase()) > -1);
                }
            };
            MultiSelectSearchFilter = __decorate([
                core_1.Pipe({
                    name: 'searchFilter'
                }), 
                __metadata('design:paramtypes', [])
            ], MultiSelectSearchFilter);
            let MultiselectDropdown = class MultiselectDropdown {
                constructor(element, differs) {
                    this.element = element;
                    this.differs = differs;
                    this.selectionLimitReached = new core_1.EventEmitter();
                    this.onModelChange = (_) => { };
                    this.onModelTouched = () => { };
                    this.numSelected = 0;
                    this.isVisible = false;
                    this.searchFilterText = '';
                    this.defaultSettings = {
                        pullRight: false,
                        enableSearch: false,
                        checkedStyle: 'checkboxes',
                        buttonClasses: 'btn btn-default',
                        selectionLimit: 0,
                        closeOnSelect: false,
                        showCheckAll: false,
                        showUncheckAll: false,
                        dynamicTitleMaxItems: 3,
                        maxHeight: '300px',
                    };
                    this.defaultTexts = {
                        checkAll: 'Check all',
                        uncheckAll: 'Uncheck all',
                        checked: 'checked',
                        checkedPlural: 'checked',
                        searchPlaceholder: 'Search...',
                        defaultTitle: 'Select',
                    };
                    this.differ = differs.find([]).create(null);
                }
                onClick(target) {
                    let parentFound = false;
                    while (target !== null && !parentFound) {
                        if (target === this.element.nativeElement) {
                            parentFound = true;
                        }
                        target = target.parentElement;
                    }
                    if (!parentFound) {
                        this.isVisible = false;
                    }
                }
                ngOnInit() {
                    this.settings = Object.assign(this.defaultSettings, this.settings);
                    this.texts = Object.assign(this.defaultTexts, this.texts);
                    this.title = this.texts.defaultTitle;
                }
                writeValue(value) {
                    if (value !== undefined) {
                        this.model = value;
                    }
                }
                registerOnChange(fn) {
                    this.onModelChange = fn;
                }
                registerOnTouched(fn) {
                    this.onModelTouched = fn;
                }
                ngDoCheck() {
                    let changes = this.differ.diff(this.model);
                    if (changes) {
                        this.updateNumSelected();
                        this.updateTitle();
                    }
                }
                clearSearch() {
                    this.searchFilterText = '';
                }
                toggleDropdown() {
                    this.isVisible = !this.isVisible;
                }
                isSelected(option) {
                    return this.model && this.model.indexOf(option.id) > -1;
                }
                setSelected(event, option) {
                    if (!this.model)
                        this.model = [];
                    var index = this.model.indexOf(option.id);
                    if (index > -1) {
                        this.model.splice(index, 1);
                    }
                    else {
                        if (this.settings.selectionLimit === 0 || this.model.length < this.settings.selectionLimit) {
                            this.model.push(option.id);
                        }
                        else {
                            this.selectionLimitReached.emit(this.model.length);
                            return;
                        }
                    }
                    if (this.settings.closeOnSelect) {
                        this.toggleDropdown();
                    }
                    this.onModelChange(this.model);
                }
                updateNumSelected() {
                    this.numSelected = this.model && this.model.length || 0;
                }
                updateTitle() {
                    if (this.numSelected === 0) {
                        this.title = this.texts.defaultTitle;
                    }
                    else if (this.settings.dynamicTitleMaxItems >= this.numSelected) {
                        this.title = this.options
                            .filter((option) => this.model && this.model.indexOf(option.id) > -1)
                            .map((option) => option.name)
                            .join(', ');
                    }
                    else {
                        this.title = this.numSelected + ' ' + (this.numSelected === 1 ? this.texts.checked : this.texts.checkedPlural);
                    }
                }
                checkAll() {
                    this.model = this.options.map(option => option.id);
                    this.onModelChange(this.model);
                }
                uncheckAll() {
                    this.model = [];
                    this.onModelChange(this.model);
                }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Array)
            ], MultiselectDropdown.prototype, "options", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], MultiselectDropdown.prototype, "settings", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], MultiselectDropdown.prototype, "texts", void 0);
            __decorate([
                core_1.Output(), 
                __metadata('design:type', Object)
            ], MultiselectDropdown.prototype, "selectionLimitReached", void 0);
            __decorate([
                core_1.HostListener('document: click', ['$event.target']), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [Object]), 
                __metadata('design:returntype', void 0)
            ], MultiselectDropdown.prototype, "onClick", null);
            MultiselectDropdown = __decorate([
                core_1.Component({
                    selector: 'ss-multiselect-dropdown',
                    providers: [MULTISELECT_VALUE_ACCESSOR],
                    styles: [`
		a { outline: none !important; }
	`],
                    template: `
        <div class="btn-group">
            <button type="button" class="dropdown-toggle" [ngClass]="settings.buttonClasses" (click)="toggleDropdown()">{{ title }}&nbsp;<span class="caret"></span></button>
            <ul *ngIf="isVisible" class="dropdown-menu" [class.pull-right]="settings.pullRight" [style.max-height]="settings.maxHeight" style="display: block; height: auto; overflow-y: auto;">
                <li style="margin: 0px 5px 5px 5px;" *ngIf="settings.enableSearch">
                    <div class="input-group input-group-sm">
                        <span class="input-group-addon" id="sizing-addon3"><i class="fa fa-search"></i></span>
                        <input type="text" class="form-control" placeholder="{{ texts.searchPlaceholder }}" aria-describedby="sizing-addon3" [(ngModel)]="searchFilterText">
                        <span class="input-group-btn" *ngIf="searchFilterText.length > 0">
                            <button class="btn btn-default" type="button" (click)="clearSearch()"><i class="fa fa-times"></i></button>
                        </span>
                    </div>
                </li>
                <li class="divider" *ngIf="settings.enableSearch"></li>
                <li *ngIf="settings.showCheckAll">
                    <a href="javascript:;" role="menuitem" tabindex="-1" (click)="checkAll()">
                        <span style="width: 16px;" class="glyphicon glyphicon-ok"></span>
                        {{ texts.checkAll }}
                    </a>
                </li>
                <li *ngIf="settings.showUncheckAll">
                    <a href="javascript:;" role="menuitem" tabindex="-1" (click)="uncheckAll()">
                        <span style="width: 16px;" class="glyphicon glyphicon-remove"></span>
                        {{ texts.uncheckAll }}
                    </a>
                </li>
                <li *ngIf="settings.showCheckAll || settings.showUncheckAll" class="divider"></li>
                <li *ngFor="let option of options | searchFilter:searchFilterText">
                    <a href="javascript:;" role="menuitem" tabindex="-1" (click)="setSelected($event, option)">
                        <input *ngIf="settings.checkedStyle == 'checkboxes'" type="checkbox" [checked]="isSelected(option)" />
                        <span *ngIf="settings.checkedStyle == 'glyphicon'" style="width: 16px;" class="glyphicon" [class.glyphicon-ok]="isSelected(option)"></span>
                        {{ option.name }}
                    </a>
                </li>
            </ul>
        </div>
    `
                }), 
                __metadata('design:paramtypes', [core_1.ElementRef, core_1.IterableDiffers])
            ], MultiselectDropdown);
            exports_1("MultiselectDropdown", MultiselectDropdown);
            let MultiselectDropdownModule = class MultiselectDropdownModule {
            };
            MultiselectDropdownModule = __decorate([
                core_1.NgModule({
                    imports: [common_1.CommonModule, forms_1.FormsModule],
                    exports: [MultiselectDropdown],
                    declarations: [MultiselectDropdown, MultiSelectSearchFilter],
                }), 
                __metadata('design:paramtypes', [])
            ], MultiselectDropdownModule);
            exports_1("MultiselectDropdownModule", MultiselectDropdownModule);
        }
    }
});
//# sourceMappingURL=multiselect-dropdown.js.map