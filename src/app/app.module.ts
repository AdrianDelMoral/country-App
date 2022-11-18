import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PaisModule } from './pais/pais.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from '../app.routing.module';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  exports: [
    SidebarComponent
  ],
  imports: [
    // Modulos de terceros
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    
    // Modulos Mios
    PaisModule,
    SharedModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
