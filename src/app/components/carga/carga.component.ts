import { Component, OnInit } from '@angular/core';
import { FilesItems } from '../../models/files-items';
import { CargarImagenesService } from '../../services/cargar-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {
	 estaSobreElemento = false;
	 archivos:FilesItems[] =[];

  constructor(public _cargarImagenes:CargarImagenesService) { }

  ngOnInit() {
  }

  cargarImagenes(){

  	this._cargarImagenes.cargarImagenesFirebase(this.archivos);

  }

  limpiarArchivos(){

  	this.archivos = [];

  }

}
