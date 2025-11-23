import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProductsAdminComponent } from './products-admin/products-admin.component';
import { HomeGuard } from './guards/home.guard';
import { HomeComponent } from './home/home.component';
import { AuthtGuard } from './guards/auth.guard';
import { ProductsclientComponent } from './productsclient/productsclient.component';
import { AuthClientGuard } from './guards/auth-client.guard';
import { PanierComponent } from './panier/panier.component';
import { CommandesadminComponent } from './commandesadmin/commandesadmin.component';
import { DetailscommandeComponent } from './detailscommande/detailscommande.component';

const routes: Routes = [
  //{ path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '',component: HomeComponent,canActivate:[HomeGuard]},
  { path: 'login',component: LoginComponent,canActivate:[HomeGuard]},
  { path: 'register',component: RegisterComponent,canActivate:[HomeGuard]},
  { path: 'productsAdmin', component: ProductsAdminComponent, canActivate: [AuthtGuard] },
  { path:'productsClient', component: ProductsclientComponent, canActivate: [AuthClientGuard] },
  { path:'panier', component: PanierComponent, canActivate: [AuthClientGuard] },
  { path:'order-details/:id', component: DetailscommandeComponent, canActivate: [AuthtGuard] },
  { path:'commandesAdmin', component: CommandesadminComponent, canActivate: [AuthtGuard] },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
