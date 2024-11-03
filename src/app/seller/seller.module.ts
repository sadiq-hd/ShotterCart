import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { ExternalSellerHomeComponent } from './external-seller-home/external-seller-home.component';


@NgModule({
  declarations: [
    ExternalSellerHomeComponent,
    
  ],
  imports: [
    CommonModule,
    SellerRoutingModule
  ]
})
export class SellerModule { }
