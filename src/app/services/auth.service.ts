import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable, pipe } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<User>;
  public isAuthenticated$: Observable<boolean>;

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {
    this.usersCollection = db.collection("users");
    this.isAuthenticated$ = auth.user.pipe(
      map((user) => !!user)
    );
  }

  public async registerUser(userData: User) {
    if (!userData.password) {
      throw new Error("Password not provided!");
    }

    const userCredentials = await this.auth.createUserWithEmailAndPassword(
      userData.email, userData.password,
    );

    if (!userCredentials.user) {
      throw new Error("User couldn't be found");
    }
    const userUID =  userCredentials.user.uid;

    await this.usersCollection.doc(userUID).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
    });

    await userCredentials.user.updateProfile({displayName: userData.name});
  }

  public async signInUserWithEmailAndPassword(email: string, password: string) {
    await this.auth.signInWithEmailAndPassword(email, password);
  }

}
