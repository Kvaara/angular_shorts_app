import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showAlert: boolean = false;
  alertMessage: string = "Hold on! You're getting logged in...";
  alertBackgroundColor: string = "bg-cornflower-blue";
  inSubmission = false;

  credentials: {
    email: string;
    password: string;
  } = {
    email: "",
    password: "",
  }

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  async signInAndShowAlert() {
    this.inSubmission = true;

    this.alertMessage = "Hold on! You're getting logged in...";
    this.alertBackgroundColor = "bg-cornflower-blue";
    this.showAlert = true;

    try {
      await this.auth.signInUserWithEmailAndPassword(this.credentials.email, this.credentials.password);
      this.modifyAlertMessageDependingOnErrors(null);
    } catch (error) {
      console.error("Your provided login credentials were wrong or you're not connected to the internet.");
      this.modifyAlertMessageDependingOnErrors(error);
    }

    this.inSubmission = false;
  }

  modifyAlertMessageDependingOnErrors(error?: any) {
    if (error) {
      this.alertMessage = "Either your email and/or password is invalid.";
      this.alertBackgroundColor = "bg-red-400";
    } else {
      this.alertMessage = "You have been successfully signed in!";
      this.alertBackgroundColor = "bg-forest-green";
    }
  }

}
