import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais-interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  /* styleUrls: ['./por-region.component.css'] */
  styles: [`
    button{
      /* margin-right:5px; */
    }
  `]
})
export class PorRegionComponent {

  regiones: string[] = ['EU', 'EFTA', 'CARICOM', 'PA', 'AU', 'USAN', 'EEU', 'AL', 'ASEAN', 'CAIS', 'CEFTA', 'NAFTA', 'SAARC']
  regionActiva: string = '';
  paises: Country[] = [];

  region: string = '';
  hayError: boolean = false;

  // Inicializar Servicio Http
  constructor(private paisService: PaisService) { }


  getClaseCSS(region: string) {
    return (region === this.regionActiva)
      ? 'btn btn-dark'
      : 'btn btn-outline-dark';
  }

  activarRegion(region: string) {
    /* 
      Si la que tenemos ahora mismo es la que recibe, no hace nada, asi no hace un refresh o carga de nuevo la página
    */
    if (region === this.regionActiva) { return; }

    // Región que tenemos actualmente, guardamos la que recibimos del boton clicado
    this.regionActiva = region;

    // para mejorar la velocidad de respuesta, purgamos los paises porque estoy cambiando a otro pais
    this.paises = [];

    // cuando hago click en un boton, pasamos por aqui, aqui debemos hacer USO de nuestro servicio...
    this.paisService.buscarRegion(region)
      .subscribe({
        next: (paises) => {
          console.log(paises);
          this.paises = paises;
          return this.paises;
        },
        error: (err) => {
          this.hayError = true;
          this.paises = [];
        }
      })
  }
/* 'name,capital,alpha2Code,flag,population' */
}
