import { AbstractControl } from "@angular/forms";

export function PasswordConsistency(control: AbstractControl){
    return control.value.password === control.value.password2 ? null : { PasswordNoMatch: true };
}