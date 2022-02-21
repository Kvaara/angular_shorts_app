import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BehaviorSubject, combineLatest, lastValueFrom, map, Observable, of, switchMap } from 'rxjs';
import { Short } from '../models/short';

@Injectable({
  providedIn: 'root'
})
export class ShortService {
  private shortsCollection: AngularFirestoreCollection<Short>;
  private isShortsReqPending = false;
  public currentShortsInPage: Short[] = [];

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private storage: AngularFireStorage,
  ) {
    this.shortsCollection = db.collection("shorts");
  };

  createShort(shortData: Short): Promise<DocumentReference<Short>>  {
    return this.shortsCollection.add(shortData);
  };

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
  };

  updateShort(id: string, title: string) {
    return this.shortsCollection.doc(id).update({
      title
    });
  };

  async deleteShort(short: Short) {
    const shortRef = this.storage.ref(`videos/${short.fileName}`);
    shortRef.delete();

    const screenshotRef = this.storage.ref(`screenshots/${short.screenshotFileName}`);
    screenshotRef.delete();

    await this.shortsCollection.doc(short.docID).delete();
  };

  async getShorts() {

    if (!this.isShortsReqPending) {
      this.isShortsReqPending = true;
      let query = this.shortsCollection.ref.orderBy("timestamp", "desc")
      .limit(6);
  
      const { length } = this.currentShortsInPage;
  
      if (length) {
        const lastDocID = this.currentShortsInPage[length - 1].docID;
        const lastDoc = await lastValueFrom(this.shortsCollection.doc(lastDocID).get());
        query = query.startAfter(lastDoc);
      };

      const snapshot = await query.get();
      snapshot.forEach((doc) => {
        this.currentShortsInPage.push({
          docID: doc.id,
          ...doc.data()
        });
      });

      this.isShortsReqPending = false;
    };
  };
};
