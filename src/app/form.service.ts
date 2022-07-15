import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Injectable()
export class FormService {
  constructor(private http: HttpClient){}

  getUserData(): Observable<any> {
    return forkJoin([this.getUser(), this.getFields()]);
  }

  getUser(){
    return this.http.get<{ name: string }>('assets/json-powered/user.json');
  }

  getFields() {
    return this.http.get<FormlyFieldConfig[]>('assets/json-powered/form-layout.json');
  }

  getGenders() {
    return this.http.get<{ label: string, value: string }[]>('assests/json-powered/gender-options.json');
  }

  getNations(){
    return this.http.get<{ label: string, value: any }[]>('assests/json-powered/nation-options.json');
  }

  getCities(){
    return this.http.get<{ label: string, value: any }[]>('assests/json-powered/city-options.json');
  }
}
