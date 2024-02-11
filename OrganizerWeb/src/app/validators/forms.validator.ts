import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function PasswordConsistency(control: AbstractControl){
    return control.value.password === control.value.password2 ? null : { PasswordNoMatch: true };
}

export function PatternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl) => {
        if (!control.value) {
            // if the control value is empty return no error.
            return null;
        }
  
        // test the value of the control against the regexp supplied.
        const valid = regex.test(control.value);
  
        // if true, return no error, otherwise return the error object passed in the second parameter.
        return valid ? null : error;
    };
}