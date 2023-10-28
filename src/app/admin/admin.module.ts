import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { ReceiveProductsComponent } from './receive-products/receive-products.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';


@NgModule({
  declarations: [
    AdminLoginComponent,
    
    HeaderAdminComponent,
    ReceiveProductsComponent,
    AdminDashboardComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    

  ]
})
export class AdminModule { }
