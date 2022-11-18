import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { switchMap, tap } from 'rxjs/operators'; // permite recibir un observable, y devolver otro observable(.subscribe, por ejemplo)
import { Country } from '../../interfaces/pais-interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
})
export class VerPaisComponent implements OnInit {
  
  pais!: Country;

  // activatedRoute: tiene todo lo necesario para poder suscribirnos a cualquier
  // cambio del URL, ejemplo: .../pais/ES, si cambiamos el 'ES', por 'USA' 
  // pues cambia la pagina los datos
  constructor(
    private activatedRoute: ActivatedRoute,
    // injectar nuestro servicio para poderlo utilizar
    private paisService: PaisService
  ) { }

  ngOnInit(): void {
    // se hace de la siguiente manera:
    /* 
      // Leer los parametros que viene en el url
      this.activatedRoute.params
      .subscribe(({ id }) => { // extraer el id
        // nos devolverá lo que tenemos en el app.routeing.module, en la parte ed pais/:id
        console.log(id);
        this.paisService.getPaisPorAlpha(id) // ese id es el que mando a ese getPaisPorAlpha(es un observable, que emite el pais)
        .subscribe(pais => { // con eso obtengo el pais, y lo muestro en consola
          console.log(pais);
        })
      }); 
      */

    // Para evitarnos un subscribe dentro de otro subscribe, y reducir el codigo:
    this.activatedRoute.params
      // operador RXJS
      .pipe( // especificar cualquier CANTIDAD de operadores que van a trabajar con el producto del observable activatedRoute
        // Esto hace que en vez de devolver el params, devuelve el id del param  
        switchMap((param) => this.paisService.getPaisPorAlpha(param['id'])),
        tap(console.log)
      )
      .subscribe(pais => {
        console.log(pais);
        
        return this.pais = pais;
    })
  }

}
