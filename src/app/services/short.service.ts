import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/compat/firestore';
import { map, Observable, of, switchMap } from 'rxjs';
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
    return this.shortsCollection.add(shortData);
  }

  getShortsMadeByUser(): Observable<QueryDocumentSnapshot<Short>[]> {
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
