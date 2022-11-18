import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais-interface';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
})
export class PorCapitalComponent {

  capital: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  // Inicializar Servicio Http
  constructor(private paisService: PaisService) { }

  buscar(capital: string) {
    this.hayError = false;
    this.capital = capital;

    this.paisService.buscarCapital(capital)
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
}