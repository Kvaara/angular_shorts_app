import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class RegisterValidators {
    static match(controlName: string, matchingControlName: string): ValidatorFn {

        return (formGroup: AbstractControl) : ValidationErrors | null => {
            const control = formGroup.get(controlName);
            const matchingControl = formGroup.get(matchingControlName);
    
            if (!control || !matchingControl) {
                return { controlNotFound: false };
            } 
    
            const error = control.value === matchingControl.value ?
            null : { noMatch: true };
    
            return error;
        }
    }
}
