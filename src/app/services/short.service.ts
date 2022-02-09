import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BehaviorSubject, combineLatest, map, Observable, of, switchMap } from 'rxjs';
import { Short } from '../models/short';

@Injectable({
  providedIn: 'root'
})
export class ShortService {
  private shortsCollection: AngularFirestoreCollection<Short>;

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private storage: AngularFireStorage,
  ) {
    this.shortsCollection = db.collection("shorts");
  }

  createShort(shortData: Short): Promise<DocumentReference<Short>>  {
    return this.shortsCollection.add(shortData);
  }

  getShortsMadeByUser(sort$: BehaviorSubject<string>): Observable<QueryDocumentSnapshot<Short>[]> {
    return combineLatest([
      this.auth.user,
      sort$,
    ]).pipe(
      switchMap((values) => {
        const [user, sort] = values;

        if (!user) return of([]);
        const shortsQuery = this.shortsCollection.ref.where(
          "uid", "==", user.uid
        ).orderBy(
          "timestamp",
          sort === "1" ? "desc" : "asc",
        );
        return shortsQuery.get();
      }),
      map((snapshot) => (snapshot as QuerySnapshot<Short>).docs),
    );
  }

  updateShort(id: string, title: string) {
    return this.shortsCollection.doc(id).update({
      title
    });
  }

  async deleteShort(short: Short) {
    const shortRef = this.storage.ref(`videos/${short.fileName}`);
    shortRef.delete();

    await this.shortsCollection.doc(short.docID).delete();
  }
}
