import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { Country } from '../interfaces/pais-interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PaisService {

  // llamados a diferentes end-points de una api sola
  //      https://restcountries.com/v3.1/name/united
  private apiUrl: string = 'https://restcountries.com/v2'

  // Getter que devolverá los parametros y nos permitirá configurar los parametros del URL
  get httpParams() {
    return new HttpParams()
      .set('fields', 'name,capital,alpha2Code,flags,population');// Para usar los params en la petición siguiente...
  }

  constructor(private http: HttpClient) { } // constructor para usar el observable HttpClient creado
  
  /*-------------------------------   BUSCAR PAIS   ------------------------------------------------*/
  buscarPais(pais: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${pais}`;
    
    // aqui se usan los params de la siguiente forma, le estoy diciendo que utilice esos parametros, tmbn en la petición
    return this.http.get<Country[]>(url, { params: this.httpParams });
  }
  /*-------------------------------   BUSCAR PAIS   ------------------------------------------------*/



  /*-------------------------------   BUSCAR CAPITAL   ------------------------------------------------*/
  buscarCapital(capital: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${capital}`;
    // aqui se usan los params de la siguiente forma, le estoy diciendo que utilice esos parametros, tmbn en la petición
    return this.http.get<Country[]>(url, { params: this.httpParams });
  }
  /*-------------------------------   BUSCAR CAPITAL   ------------------------------------------------*/



  /*-------------------------------   BUSCAR REGIÓN   ------------------------------------------------*/
  buscarRegion(region: string): Observable<Country[]> {

    const url = `${this.apiUrl}/regionalbloc/${region}`;

    console.log(url);

    // aqui se usan los params de la siguiente forma, le estoy diciendo que utilice esos parametros, tmbn en la petición
    return this.http.get<Country[]>(url, { params: this.httpParams }) 
      .pipe(
        tap(console.log)
      )
  }
  /*-------------------------------   BUSCAR REGIÓN   ------------------------------------------------*/



  /*-------------------------------   VER PAÍS   ------------------------------------------------*/
  getPaisPorAlpha(id: string): Observable<Country> {
    const url = `${this.apiUrl}/alpha/${id}`;
    return this.http.get<Country>(url);
  }
  /*-------------------------------   VER PAÍS   ------------------------------------------------*/
}
