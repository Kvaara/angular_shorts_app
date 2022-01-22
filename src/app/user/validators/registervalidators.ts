import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class RegisterValidators {
    static match(controlName: string, matchingControlName: string): ValidatorFn {

        return (formGroup: AbstractControl) : ValidationErrors | null => {
            const control = formGroup.get(controlName);
            const matchingControl = formGroup.get(matchingControlName);
    
            if (!control || !matchingControl) {
                console.error("Form controls couldn't be found in the form group");
                return { controlNotFound: false };
            } 
    
            const error = control.value === matchingControl.value ?
            null : { noMatch: true };
    
            matchingControl.setErrors(error);

            return error;
        }
    }
}
