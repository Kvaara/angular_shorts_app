import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { delay, filter, map, Observable, of, switchMap } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _usersCollection: AngularFirestoreCollection<User>;

  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;

  private _redirect = false;

  constructor(
    private auth: AngularFireAuth, 
    private db: AngularFirestore, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) {
    this._usersCollection = db.collection("users");
    this.isAuthenticated$ = auth.user.pipe(
      map((user) => !!user)
    );
    this.router.events.pipe(
      filter( (event) => event instanceof NavigationEnd),
      map( (_) => this.activatedRoute.firstChild),
      switchMap( (route) => route?.data ?? of({}))
      ).subscribe( (routeData) => routeData["isAuthOnly"] ? this._redirect = true : this._redirect = false);

    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(delay(1500));
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

    await this._usersCollection.doc(userUID).set({
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

  public async signOut($event?: Event) {
    $event?.preventDefault();

    await this.auth.signOut();

    if (this._redirect) {
      await this.router.navigateByUrl("/");
    }

  }

}
