import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
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

  async createShort(shortData: Short)  {
    await this.shortsCollection.add(shortData);
  }
}
