import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { FilesItems } from '../models/files-items';


@Injectable({
  providedIn: 'root'
})
export class CargarImagenesService {

  private CARGAR_IMAGENES = 'img';

  constructor(private db:AngularFirestore) { }

// Se carga las imagenes y se guarda en firebase storage
  cargarImagenesFirebase(imagenes:FilesItems[]){

  	const storageRef = firebase.storage().ref();

    for(const item of imagenes){
      item.estaSubiendo=true;
      if (item.progreso >= 100) {
        continue;
      }

      const upLoadTask:firebase.storage.UploadTask = 
            storageRef.child(`${this.CARGAR_IMAGENES}/${item.nombreArchivo}`)
                       .put(item.archivo);

     upLoadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) => 
        item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => console.error('Error al subir', error),
        () => {
          console.log('Imagen cargada');
          upLoadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            item.url = downloadURL;
            item.estaSubiendo = false;
            this.guardarImagen({
              nombre: item.nombreArchivo,
              url: item.url
            });
          });
        });
    }

  }

// Se guarda en firebase en la database se guarda la variable el nombre de la imagen y url de la imagen
  private guardarImagen(imagen:{nombre:string, url:string}){

  	this.db.collection(`/${this.CARGAR_IMAGENES}`)
  		.add(imagen);
  }
}
