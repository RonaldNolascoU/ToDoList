import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  collectionName = 'Tasks';
  constructor( private firestore: AngularFirestore) { }

  createTask(record) {
    return this.firestore.collection(this.collectionName).add(record);
  }

  getTasks() {
    //snapshotChanges() method: get records and also subscribe it to get updates
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  updateTask(recordID, record) {
    //doc() method takes collection name with document id to update the record, then the update() method is called to save the document.
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

}
