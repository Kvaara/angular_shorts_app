import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from "../../services/auth.service";
import { User } from 'src/app/models/user.model';


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

  constructor(private auth: AuthService) {}

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

  userData: User = {
    name: this.registerForm.value.name,
    age: this.registerForm.value.age,
    email: this.registerForm.value.email,
    password: this.registerForm.value.password,
    phoneNumber: this.registerForm.value.phoneNumber,
  }; 

  async registerAndShowAlert() {
    this.inSubmission = true;

    this.alertMessage = "Hold on! Your account is being processed...";
    this.alertBackgroundColor = "bg-cornflower-blue";
    this.showAlert = true;

    if (this.areCredentialsValid()) {
      await this.createUserWithErrHandling(this.userData);
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

  async createUserWithErrHandling(userData: User) {
    try {
      await this.auth.registerUser(userData); 
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
