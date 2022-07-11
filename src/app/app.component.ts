import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';
import { DataService } from './core/data.service';
import { startWith, switchMap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit } from '@angular/core';

export function EmailValidator(control: FormControl): ValidationErrors {
  return !control.value || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(control.value)
  ? null
  : {email: true};
}

const formlyRow = (fieldConfig: FormlyFieldConfig[]) => {
  return {
    fieldGroupClassName: 'display-flex',
    fieldGroup: fieldConfig
  }

}

const formlyInput = (config: { key: string, label: string, templateOptions: FormlyTemplateOptions}): FormlyFieldConfig => {
  return {
    key: config.key,
    type: 'input',
    className: 'flex-1',
    templateOptions: {
      label: config.label,
      ...config.templateOptions
    },
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent{
  form = new FormGroup({});
  model: any = {
    // id: 123,
    // name: null,
    // password: null,
    // email: null,
    // nationID: null,
    // cityID: null,
    // gender: null,
    // dob: null,
    // ip: null

  };
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    formlyRow(
    [
      {
        key: 'lang',
        type: 'select',
        className: 'flex-4',
        templateOptions: {
          required: true,
          translate: true,
          label: 'Lang',
          change: (field) => this.translate.use(field.formControl.value),
          options: [
            { label: 'ga', value: 'ga' },
            { label: 'en', value: 'en' },
          ],
        },
      },
    ]),

    formlyRow(
    [
      formlyInput({
        key: 'name',
        label: 'Name',
        templateOptions: {
          translate: true,
          required: true,
          //placeholder: 'Name',
        },

      }),
      {
        key: 'email',
        type: 'input',
        className: 'flex-1',
        templateOptions:{
          translate: true,
          label: 'Email address',
          //placeholder: 'Email',
          type: 'email',
          required: true
        },
        expressionProperties: {
          'templateOptions.label': this.translate.stream('Email address'),
        },
        validators:{
          validation: [EmailValidator]
        }
      },
      {
        key: 'password',
        type: 'input',
        className: 'flex-1',
        templateOptions: {
          translate: true,
          label: 'Password',
          //placeholder: 'Password',
          required: true,
          type: 'password'
        },
        expressionProperties: {
          'templateOptions.label': this.translate.stream('Password'),
        },
      },
    ]),

    formlyRow(
    [
      {
        key: 'dob',
        type: 'input',
        className: 'flex-1',
        templateOptions: {
          translate: true,
          label: 'Date of Birth',
          required: true,
          type: 'date'
        },
        expressionProperties: {
          'templateOptions.label': this.translate.stream('Date of Birth'),
        },

      },
      {
        key: 'nationID',
        type: 'select',
        className: 'flex-1',
        templateOptions:{
          translate: true,
          label: 'Country',
          //placeholder: 'Country',
          required: true,
          options: this.dataService.getNations()
        },
        expressionProperties: {
          'templateOptions.label': this.translate.stream('Country'),
        },
      },
      {
        key: 'cityID',
        type: 'select',
        className: 'flex-1',
        templateOptions:{
          translate: true,
          label: 'City',
          //placeholder: 'City',
          required: true,
          options: [],
        },
        expressionProperties: {
          'templateOptions.disabled': (model) => !model.nationID,
          'model.cityID': '!model.nationID ? null : model.cityID'
        },
        hideExpression: model => !this.model.nationID,
        hooks: {
          onInit: (field: FormlyFieldConfig) => {
            field.templateOptions.options = field.form
              .get('nationID')
              .valueChanges.pipe(
                startWith(this.model.nationID),
                switchMap(nationID => this.dataService.getCities(nationID))
            );
          }
        }
      },
    ]),

    formlyRow(
    [
      {
        key: 'gender',
        type: 'radio',
        className: 'flex-1',
        templateOptions:{
          translate: true,
          label: 'Gender',
          required: true,
          options: [
            {value: 'M', label: 'Male'},
            {value: 'F', label:'Female'},
            {value: 'N/A', label: 'Prefer not to say'}
          ]
        },
        expressionProperties: {
          'templateOptions.label': this.translate.stream('Gender'),
          // 'templateOptions.options': this.translate.stream('Choices.Male'),

        },
      },
    ]),
    formlyRow(
    [
      {
        key: 'Checkbox',
        type: 'checkbox',
        className: 'flex-4',
        templateOptions:{
          translate: true,
          label: 'Checkbox',
          required: true,
        },
        expressionProperties: {
          'templateOptions.label': this.translate.stream('Checkbox'),
        },
      },
    ])
  ];

  constructor(
    private dataService: DataService,
    public translate: TranslateService,
    private http: HttpClient
  ){
    translate.addLangs(['en', 'ga']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();

    translate.use(browserLang.match(/en|ga/) ? browserLang : 'en');
    this.model.lang = translate.currentLang;
  }

  //ngOnInit(){
  //   this.http.get<FormlyFieldConfig[]>('/assests/dynamic-form.json')
  //     .subscribe(fields => {
  //       this.fields =fields;
  //})
  //}
  onSubmit(){
    if(this.form.value){
      console.log(this.model);
      this.options.resetModel;
    }
  }
  onClearModel(){
    if(this.form.value){
    }
  }
}
