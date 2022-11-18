import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais-interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
    li {
      cursor: pointer;
    }
    `
  ]
})
export class PorPaisComponent {

  pais: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  // Inicializar Servicio Http
  constructor(private paisService: PaisService) { }

  buscar(pais: string) {
    this.hayError = false;
    this.pais = pais;
    this.mostrarSugerencias = false;

    this.paisService.buscarPais(pais)
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

  sugerencias(pais: string) {
    this.hayError = false;
    this.pais = pais;
    this.mostrarSugerencias = true;

    this.paisService.buscarPais(pais)
      .subscribe(
        paises => this.paisesSugeridos = paises.splice(0, 5),
        (err) => this.paisesSugeridos = []
      );
  }

  buscarSugerido(termino: string) {
    this.buscar(termino);    
  }

}
