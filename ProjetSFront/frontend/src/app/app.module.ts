import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductsAdminComponent } from './products-admin/products-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ProductsclientComponent } from './productsclient/productsclient.component';
import { NavarComponent } from './navar/navar.component';
import { PanierComponent } from './panier/panier.component';
import { CommandesclientComponent } from './commandesclient/commandesclient.component';
import { CommandesadminComponent } from './commandesadmin/commandesadmin.component';
import { DetailscommandeComponent } from './detailscommande/detailscommande.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProductsAdminComponent,
    HomeComponent,
    ProductsclientComponent,
    NavarComponent,
    PanierComponent,
    CommandesclientComponent,
    CommandesadminComponent,
    DetailscommandeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,// Ajoute ReactiveFormsModule ici
    HttpClientModule, // ✅ Ajoute ici
    FormsModule, BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
