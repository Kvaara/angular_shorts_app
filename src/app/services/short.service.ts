import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Short } from '../models/short';

@Injectable({
  providedIn: 'root'
})
export class ShortService {
  shortsCollection: AngularFirestoreCollection<Short>;

  constructor(
    private db: AngularFirestore
  ) {
    this.shortsCollection = db.collection("shorts");
  }

  createShort(shortData: Short): Promise<DocumentReference<Short>>  {
    // await this.shortsCollection.add(shortData);
    return this.shortsCollection.add(shortData);
  }
}
