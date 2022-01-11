import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  showAlert: boolean = false;
  alertMessage: string = "Hold on! Your account is being processed...";
  alertBackgroundColor: string = "bg-cornflower-blue";
  inSubmission = false;

  constructor(private auth: AngularFireAuth) {}

  name =  new FormControl("", [
    Validators.required,
    Validators.minLength(2),
  ]);
  email = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);
  age = new FormControl("", [
    Validators.required,
    Validators.min(18),
    Validators.max(120),
  ]);
  password = new FormControl("", [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  ]);
  confirm_password = new FormControl("", [
    Validators.required,
  ]);
  phoneNumber = new FormControl("", [
    Validators.required,
    Validators.minLength(12),
    Validators.maxLength(12),
  ]);

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber,
  });

  async registerAndShowAlert() {
    this.inSubmission = true;

    this.alertMessage = "Hold on! Your account is being processed...";
    this.alertBackgroundColor = "bg-cornflower-blue";
    this.showAlert = true;

    if (this.areCredentialsValid()) {
      const {email, password} = this.registerForm.value;
      await this.createUserWithErrHandling(email, password);
    } else {
      this.alertMessage = "Your email and/or password doesn't meet the requirements";
      this.alertBackgroundColor = "bg-red-400";
    }
    
    this.inSubmission = false;
  }

  areCredentialsValid(): boolean {
    if (this.registerForm.invalid) {
      return false;
    } else {
      return true;
    }
  }

  async createUserWithErrHandling(email: string, password: string) {
    try {
      const userCredentials = await this.auth.createUserWithEmailAndPassword(
        email, password,
      );
      console.log(userCredentials);
      this.modifyAlertMessageDependingOnErrors(null);
    } catch (error) {
      this.modifyAlertMessageDependingOnErrors(error);
      throw new Error("There was an unexpected error:" + error);
    }
  }

  modifyAlertMessageDependingOnErrors(error?: any) {
    if (error) {
      // TODO Email is already taken
      this.alertMessage = "There was an unexpected error. Please try again.";
      this.alertBackgroundColor = "bg-red-400";
    } else {
      this.alertMessage = "Your account has been succesfully created!";
      this.alertBackgroundColor = "bg-forest-green";
    }
  }
}
