import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PorPaisComponent } from './app/pais/pages/por-pais/por-pais.component';
import { PorRegionComponent } from './app/pais/pages/por-region/por-region.component';
import { PorCapitalComponent } from './app/pais/pages/por-capital/por-capital.component';
import { VerPaisComponent } from "./app/pais/pages/ver-pais/ver-pais.component";

// rutsas de TIPO: Routes
const routes: Routes = [
    {
        path: '', // esta ruta es para cuando esto en el inicio: url.com
        component: PorPaisComponent,
        pathMatch: 'full' // Cuando estemos en esta URL, no en ninguna otra parte, que caiga en este sitio SI o SI y no sea otro, por si se confunde
    },
    {
        path: 'region', // esta ruta es para cuando esto en el inicio: url.com/region
        component: PorRegionComponent,
    },
    {
        path: 'capital', // esta ruta es para cuando esto en el inicio: url.com/capital
        component: PorCapitalComponent,
    },
    // Ruta especial para poder mostrar el ver-pais, y sea dinamico, si quiero que vaya a una ruta en concreto: pais/nombreConcreto
    {
        path: 'pais/:id', // esta ruta es para cuando esto en el inicio: url.com/pais/(variable 'codigoPais')
        component: VerPaisComponent,
    },
    {
        path: '**', // esta ruta es para cuando da un error
        redirectTo: ''
    },

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {
}