import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { LayoutRoutingModule } from './layout.routing.module';
import { SharedModule } from "../shared/shared.module";
import { ProductService } from './modules/product/services/product.service';



@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
],
exports: [
  SharedModule,
]
})
export class LayoutModule { }
