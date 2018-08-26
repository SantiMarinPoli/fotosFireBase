import { Directive,EventEmitter,ElementRef,HostListener,Input,Output } from '@angular/core';
import { FilesItems } from '../models/files-items';

@Directive({
  selector: '[appNgDropFiles]'
})

export class NgDropFilesDirective {

  @Input() archivos:FilesItems[] = [];
  @Output() mouseSobre:EventEmitter<boolean> = new EventEmitter();

  constructor() { }

// El evento utiliza cuando el mouse esta encima de un elemento se dispara un true
  @HostListener('dragover',['$event'])
  public onDragEnter(event:any){
  	this.mouseSobre.emit(true);
  	this._prevenirDetener(event);
  }

// El evento utiliza cuando el mouse se aleja el elemento se dispara un false
   @HostListener('dragleave',['$event'])
  public onDragLeave(event:any){
  	this.mouseSobre.emit(false);
  }

//El evento se utiliza arrastrar y soltar el mouse
  @HostListener('drop',['$event'])
  public onDrop(event:any){

  	const transferencia = this._getTrasferencia(event);

  	if (!transferencia) {
  		return;
  	}

  	this._extraerArchivos(transferencia.files);
  	this._prevenirDetener(event);
  	this.mouseSobre.emit(false);
  }



// Validaciones

//  extender compatibilidad de los navegadores
private _getTrasferencia(event:any){
	return event.dataTransfer ? event.dataTransfer:event.originalEvent.dataTransfer;
}

private _extraerArchivos(archivosLista:FileList){
	// console.log(archivos);
	for(const propiedad in Object.getOwnPropertyNames(archivosLista)){
		const archivoTemporal = archivosLista[propiedad];

		if (this._archivoPuedeSerCargado(archivoTemporal)) {
			const nuevoArchivo = new FilesItems(archivoTemporal);
			this.archivos.push(nuevoArchivo);
		}
	}

	console.log(this.archivos);
}

private _archivoPuedeSerCargado(archivo:File):boolean{

	if (!this._archivoYaEstaDroppeado(archivo.name) && this._esImagen(archivo.type)) {
		return true;
	}else{
		return false;
	}
}

// La funcion es prevenir cuando el archivo esta sobre encima de la pagina, la funcion ayuda que no abre el archivo
private _prevenirDetener(event){
	event.preventDefault();
	event.stopPropagation();
}

// La funcion utiliza que el archivo esta agregado del elemento
private _archivoYaEstaDroppeado(nombreArchivo:string):boolean{

	for(let archivo of this.archivos){

		if (archivo.nombreArchivo === nombreArchivo) {
			
			console.log('El archivo'+nombreArchivo+' ya esta agregado');
			return true;
		}
	}

	return false;

}

// La funcion se valida que los archivos debe agregar un tipo imagen
private _esImagen(tipoArchivo:string):boolean{
	return (tipoArchivo === '' || tipoArchivo === undefined)? false : tipoArchivo.startsWith('image');
}


}
