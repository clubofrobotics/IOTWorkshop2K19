import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore,
         AngularFirestoreCollection} from 'angularfire2/firestore';


import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegServiceService {

  regsCollection: AngularFirestoreCollection<any>;
  regs: Observable<any[]>
  status: boolean


  constructor(private db: AngularFirestore) {
    this.regsCollection = this.db.collection('/registrations');
    this.regs = this.regsCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as any;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
    console.log(this.regs);
  }


  getData(record) {
    return this.db.collection('/registrations', ref =>
      ref.where('usn', '==', record.usn)).valueChanges();
  }

  upload(item: any) {
    this.regsCollection.add(item);
  }
}
