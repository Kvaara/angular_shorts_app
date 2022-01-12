import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) { }

  public async registerUser(userData: User) {
    if (!userData.password) {
      throw new Error("Password not provided!");
    }

    const userCredentials = await this.auth.createUserWithEmailAndPassword(
      userData.email, userData.password,
    );
    
    await this.db.collection<User>("users").add({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
    });
  }

}
