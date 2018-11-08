import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private storage: AngularFireStorage) {
  }

  public upload(event) {
    const file = event.target.files[0];
    const filePath = event.target.files[0].name;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
  }
}
