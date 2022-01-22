import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class RegisterValidators {
    static matchPasswords: ValidatorFn = (formGroup: AbstractControl) : ValidationErrors | null => {
        const control = formGroup.get("password");
        const matchingControl = formGroup.get("confirm_password");

        if (!control || !matchingControl) {
            return { controlNotFound: false };
        } 

        const error = control.value === matchingControl.value ?
        null : { noMatch: true };

        return error;
    }
}
