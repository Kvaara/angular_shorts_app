import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials: {
    email: string;
    password: string;
  } = {
    email: "",
    password: "",
  }

  constructor() { }

  ngOnInit(): void {
  }

  signIn(): void {
    console.log("sign ing");
  }

}
