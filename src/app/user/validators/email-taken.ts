import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";

@Injectable({ 
    providedIn: 'root' 
})
export class EmailTaken implements AsyncValidator {

    constructor(private auth: AngularFireAuth) {};

     validate = async (control: AbstractControl): Promise<ValidationErrors | null> => {
        // We use this function as a work-around to check if an email already exists
         const emailSignInMethods: string[] = await this.auth.fetchSignInMethodsForEmail(control.value);

         if (emailSignInMethods.length === 0) {
            return null;
         }
         return { emailTaken: true };
         
    };

}
