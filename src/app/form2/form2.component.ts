import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';
import { DataService } from '../core/data.service';
import { startWith, switchMap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { FormService } from '../form.service';

export function EmailValidator(control: FormControl): ValidationErrors {
  return !control.value || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(control.value)
  ? null
  : {email: true};
}

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.css']
})
export class Form2Component {

  form: FormGroup;
  options: FormlyFormOptions = {};
  model: any;
  fields: FormlyFieldConfig[];

  constructor(
    private dataService: DataService,
    public translate: TranslateService,
    private http: HttpClient,
    private formService: FormService){
      this.formService.getUserData('assets/json-powered/form2-layout.json').subscribe(([model, fields]) => {
        this.form = new FormGroup({});
        this.model = model;
        this.fields = this.mapFields(fields);
      })

      translate.addLangs(['en', 'ga', 'uk']);
      translate.setDefaultLang('en');

      const browserLang = translate.getBrowserLang();

      translate.use(browserLang.match(/en|ga/) ? browserLang : 'en');
    }

  // ngOnInit() {
  //   this.http.get<FormlyFieldConfig[]>('../assests/form2-layout.json')
  //     .subscribe(fields => {
  //       this.fields = fields;
  // })
  // }

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
      if(f.key === 'lang'){
        f.type = 'select';
      //   f.templateOptions.options = this.formService.getLangs();
      //   f.templateOptions.change = (fields) => this.translate.use(fields.formControl.value)
      }
      return f;
    })

  }

  useLanguage(language: string): void {
    this.translate.use(language);
}
}
