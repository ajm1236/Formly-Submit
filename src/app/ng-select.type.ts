import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { FieldType } from "@ngx-formly/core";

@Component({
  selector: "formly-ng-select",
  template: `
    <div>
      <ng-select

        [placeholder]="to.label"
        bindValue="['to.bindValue'] || 'value'"
        [formControl]="formControl"
        [class.is-invalid]="showError"
      >
      </ng-select>
    </div>
  `
})
export class NgSelectFormlyComponent extends FieldType{
  private _formControl!: FormControl;
  public override get formControl(): FormControl {
    return this._formControl;
    //[items]="to.options" ^line 10
  }
  public override set formControl(value: FormControl) {
    this._formControl = value;
  }
}
