import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getNations(){
    return of([
      {
        value: null,
        label: '--'
      },
      {
        value: 1,
        label: "Ireland"
      },
      {
        value: 2,
        label: "England"
      },
      {
        value: 3,
        label: "USA"
      },
    ])
  }

  getCities(nationID =  null){
    return of(
      [
        {
          value: null,
          label: '--',
          nationID: null
        },
        {
          value: 1,
          label: "Dublin",
          nationID: 1
        },
        {
          value: 12,
          label: "Cork",
          nationID: 1
        },
        {
          value:13,
          label: "Galway",
          nationID: 1
        },
        {
          value: 2,
          label: "London",
          nationID: 2
        },
        {
          value:22,
          label: "Manchester",
          nationID: 2
        },
        {
          value:23,
          label: "Newcastle",
          nationID: 2
        },
        {
          value:3,
          label: "New York",
          nationID: 3
        },
        {
          value:32,
          label: "Florida",
          nationID: 3
        },
        {
          value:33,
          label: "Los Angeles",
          nationID: 3
        },
      ].filter(entry => {
        if(nationID){
          return entry.nationID === nationID;
        } else{
          return true;
        }
      })
    );

  }

  compareDates(dob: () => string){
    var now = new Date().toDateString
    if(dob > now){
      return false;
    }
    else{
      return true;
    }
  }
}
