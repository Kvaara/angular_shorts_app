import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, QuerySnapshot } from '@angular/fire/compat/firestore';
import { map, of, switchMap } from 'rxjs';
import { Short } from '../models/short';

@Injectable({
  providedIn: 'root'
})
export class ShortService {
  private shortsCollection: AngularFirestoreCollection<Short>;

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
  ) {
    this.shortsCollection = db.collection("shorts");
  }

  createShort(shortData: Short): Promise<DocumentReference<Short>>  {
    // await this.shortsCollection.add(shortData);
    return this.shortsCollection.add(shortData);
  }

  getShortsMadeByUser() {
    return this.auth.user.pipe(
      switchMap((user) => {
        if (!user) return of([]);
        const shortsQuery = this.shortsCollection.ref.where(
          "uid", "==", user.uid
        );
        return shortsQuery.get();
      }),
      map((snapshot) => (snapshot as QuerySnapshot<Short>).docs),
    );
  }
}
