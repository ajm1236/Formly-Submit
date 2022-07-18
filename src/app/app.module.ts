import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule, FORMLY_CONFIG } from '@ngx-formly/core';
import { ButtonModule } from 'primeng/button';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { SharedModule } from 'primeng/api';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormlyDatePickerModule } from '@ngx-formly/primeng/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgSelectFormlyComponent } from './ng-select.type';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { registerTranslateExtension } from './translate.extension';
import { FormService } from './form.service';
import { FileValueAccessor } from './file/file-value-accessor';
import { FormlyFieldFile } from './file/file-type.component';


export function EmailValidatorMessage(err, field: FormlyFieldConfig) {
  return `"${field.formControl.value}" is not a valid Email Address`;
}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../assets/i18n/', '.json');
  }



@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    SharedModule,
    FormlyDatePickerModule,
    FormlyPrimeNGModule,
    ReactiveFormsModule,
    ButtonModule,
    BrowserAnimationsModule,
    NgSelectModule,
    HttpClientModule,
    FormlyModule.forRoot({
      validationMessages: [
        {
          name: 'required',
          message: 'This field is required'
        },
        {
          name: 'email',
          message: EmailValidatorMessage
        }
      ],
      types:[
        {
          name: 'my-autocomplete',
          component: NgSelectFormlyComponent
        },
        {
           name: 'file', component: FormlyFieldFile, wrappers: ['form-field'],
        }
      ],
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [AppComponent, NgSelectFormlyComponent, FileValueAccessor, FormlyFieldFile],
  providers: [
    {
      provide: FORMLY_CONFIG,
      multi: true,
      useFactory: registerTranslateExtension,
      deps: [TranslateService]
    },
    FormService
  ],
  bootstrap: [ AppComponent ]
})


export class AppModule {}
