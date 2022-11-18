import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
})
export class PaisInputComponent implements OnInit {


  @Output() onEnter: EventEmitter<string> = new EventEmitter(); // a los eventos se les suele poner el on, onEnter, onCypress, onPais....
  @Output() onDebounce: EventEmitter<string> = new EventEmitter(); // evento para la caja de sugerencias del input
  
  @Input() placeholder: string = ''; // evento para la caja de sugerencias del input

  // asi se crea un subject, que va a ser el debouncer, es un observable especial, la idea es que se emita cuando dejo de escribir
  debouncer: Subject<string> = new Subject();

  termino: string = '';

  ngOnInit() {
    this.debouncer
      .pipe(debounceTime(300)) // lo que viene siendo, esperar x milesimas de segundos para que funcione esta funcion ngOnInit
      .subscribe(valor => {
        // console.log('debouncer:', valor);
        this.onDebounce.emit(valor);
      })
  }

  buscar() {
    this.onEnter.emit(this.termino);
  }

  teclaPresionada(event: any) {
    this.debouncer.next(this.termino);
  }

}
