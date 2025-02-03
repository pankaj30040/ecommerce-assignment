import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: any;
  currentImageIndex: number = 0;
  constructor(private activateRoute : ActivatedRoute,
     private productService : ProductService){}

  ngOnInit(){
    this.activateRoute.params.subscribe((params:any) =>{
      this.getProductDetailById(params.id)
    })
  }

  getProductDetailById(id:any){
    this.productService.getProductById(id).subscribe((res:any) =>{
      console.log(res);
      this.product = res;
      // this.selectedImage = this.product.images[0]; // Default image
    })
  }

  prevImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.product.images.length - 1;
    }
  }

  nextImage(): void {
    if (this.currentImageIndex < this.product.images.length - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0;
    }
  }

  setImage(index: number): void {
    this.currentImageIndex = index;
  }

}
