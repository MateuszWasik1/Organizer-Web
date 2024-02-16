import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function PasswordConsistency(control: AbstractControl){
    return control.value.password === control.value.password2 ? null : { PasswordNoMatch: true };
}

export function PatternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl) => {
        if (!control.value) 
            return null;
  
        const valid = regex.test(control.value);
  
        return valid ? null : error;
    };
}