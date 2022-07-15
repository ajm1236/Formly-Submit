import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';
import { DataService } from './core/data.service';
import { startWith, switchMap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { FormService } from './form.service';

export function EmailValidator(control: FormControl): ValidationErrors {
  return !control.value || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(control.value)
  ? null
  : {email: true};
}

// const formlyRow = (fieldConfig: FormlyFieldConfig[]) => {
//   return {
//     fieldGroupClassName: 'formgrid grid text-xl',
//     fieldGroup: fieldConfig
//   }

// }

// const formlyInput = (config: { key: string, label: string, templateOptions: FormlyTemplateOptions}): FormlyFieldConfig => {
//   return {
//     key: config.key,
//     type: 'input',
//     className: 'field col-12 md:col-6 ',
//     templateOptions: {
//       label: config.label,
//       ...config.templateOptions
//     },
//   }
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent{

  form: FormGroup;
  options: FormlyFormOptions = {};
  model: any;
  fields: FormlyFieldConfig[];
  // male = 'FORM.CHOICES.MALE';
  // form = new FormGroup({});
  // model: any = {

  // };
  // options: FormlyFormOptions = {};
  // fields: FormlyFieldConfig[] = [
  //   // formlyRow(
  //   // [

  //   // ]),

  //   formlyRow(
  //   [
  //     {
  //       key: 'lang',
  //       type: 'select',
  //       className: 'field col-12 md:col-6',
  //       templateOptions: {
  //         required: true,
  //         translate: true,
  //         label: 'FORM.LANG',
  //         change: (field) => this.translate.use(field.formControl.value),
  //         options: [
  //           { label: 'ga', value: 'ga' },
  //           { label: 'en', value: 'en' },
  //         ],
  //       },
  //     },

  //     formlyInput({
  //       key: 'name',
  //       label: 'FORM.NAME',
  //       templateOptions: {
  //         translate: true,
  //         required: true,
  //         //placeholder: 'Name',
  //       },

  //     }),
  //     {
  //       key: 'email',
  //       type: 'input',
  //       className: 'field col-12 md:col-6',
  //       templateOptions:{
  //         translate: true,
  //         label: 'FORM.EMAIL',
  //         //placeholder: 'Email',
  //         type: 'email',
  //         required: true
  //       },
  //       expressionProperties: {
  //         'templateOptions.label': this.translate.stream('Email address'),
  //       },
  //       validators:{
  //         validation: [EmailValidator]
  //       }
  //     },
  //     {
  //       key: 'password',
  //       type: 'input',
  //       className: 'field col-12 md:col-6',
  //       templateOptions: {
  //         translate: true,
  //         label: 'FORM.PASSWORD',
  //         //placeholder: 'Password',
  //         required: true,
  //         type: 'password'
  //       },
  //       expressionProperties: {
  //         'templateOptions.label': this.translate.stream('Password'),
  //       },
  //     },
  //     {
  //       key: 'dob',
  //       type: 'input',
  //       className: 'field col-12 md:col-6',
  //       templateOptions: {
  //         translate: true,
  //         label: 'FORM.DOB',
  //         required: true,
  //         type: 'date'
  //       },
  //       expressionProperties: {
  //         'templateOptions.label': this.translate.stream('Date of Birth'),
  //       },

  //     },
  //     {
  //       key: 'nationID',
  //       type: 'select',
  //       className: 'field col-12 md:col-3',
  //       templateOptions:{
  //         translate: true,
  //         label: 'FORM.COUNTRY',
  //         //placeholder: 'Country',
  //         required: true,
  //         options: this.dataService.getNations()
  //       },
  //       expressionProperties: {
  //         'templateOptions.label': this.translate.stream('Country'),
  //       },
  //     },
  //     {
  //       key: 'cityID',
  //       type: 'select',
  //       className: 'field col-12 md:col-3',
  //       templateOptions:{
  //         translate: true,
  //         label: 'FORM.CITY',
  //         //placeholder: 'City',
  //         required: true,
  //         options: [],
  //       },
  //       expressionProperties: {
  //         'templateOptions.disabled': (model) => !model.nationID,
  //         'model.cityID': '!model.nationID ? null : model.cityID'
  //       },
  //       //hideExpression: model => !this.model.nationID,
  //       hooks: {
  //         onInit: (field: FormlyFieldConfig) => {
  //           field.templateOptions.options = field.form
  //             .get('nationID')
  //             .valueChanges.pipe(
  //               startWith(this.model.nationID),
  //               switchMap(nationID => this.dataService.getCities(nationID))
  //           );
  //         }
  //       }
  //     },
  //     {
  //       key: 'gender',
  //       type: 'radio',
  //       className: 'flex-1',
  //       templateOptions:{
  //         translate: true,
  //         label: 'FORM.GENDER',
  //         required: true,
  //         options: [
  //           {value: 'M', label: 'FORM.CHOICES.MALE'},
  //           {value: 'F', label:'FORM.CHOICES.FEMALE'},
  //           {value: 'N/A', label: 'FORM.CHOICES.N/A'}
  //         ]
  //       },
  //       expressionProperties: {
  //         'templateOptions.label': this.translate.stream('Gender'),
  //         'templateOptions.options.label': this.translate.stream('FORM.CHOICES')

  //       },
  //     },
  //     {
  //       key: 'Checkbox',
  //       type: 'checkbox',
  //       className: 'field col-12 md:col-6 text-base',
  //       templateOptions:{
  //         translate: true,
  //         label: 'FORM.CHECKBOX',
  //         required: true,

  //       },
  //       expressionProperties: {
  //         'templateOptions.label': this.translate.stream('Checkbox'),
  //       },
  //     },
  //   ]),

    // formlyRow(
    // [

    // ]),

    // formlyRow(
    // [

    // ]),
    // formlyRow(
    // [

    // ])
  //];

  constructor(
    private dataService: DataService,
    public translate: TranslateService,
    private http: HttpClient,
    private formService: FormService
  )
  {
    this.formService.getUserData().subscribe(([model, fields]) => {
      this.form = new FormGroup({});
      this.model = model;
      this.fields = this.mapFields(fields);
    })

    translate.addLangs(['en', 'ga']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();

    translate.use(browserLang.match(/en|ga/) ? browserLang : 'en');
    //this.model.lang = translate.currentLang;
  }

  ngOnInit(){
    this.http.get<FormlyFieldConfig[]>('/assests/form-layout.json')
      .subscribe(fields => {
        this.fields =fields;
  })
  }
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

  mapFields(fields: FormlyFieldConfig[]){
    return fields.map(f => {
      if(f.key === 'gender'){
        f.type = 'radio';
        f.templateOptions.options = this.formService.getGenders();
      }
      return f;
    })

  }
}
