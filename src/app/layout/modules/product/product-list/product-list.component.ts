import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUpdateProductComponent } from '../add-update-product/add-update-product.component';
import { CartService } from '../../cart/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList : any[] = [];
  constructor(private router : Router, private productService : ProductService,
    private modalService: NgbModal, private cartService : CartService
  ){}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe((res:any) =>{
      console.log(res);
      this.productList = res;
    })
  }

  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
  }

  onProductClick(id:any){
    this.router.navigate(['/layout/product/', id]);
  }

  openProductModal(product: any = {}) {
    const modalRef = this.modalService.open(AddUpdateProductComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.product = { ...product };

    modalRef.result.then(
      (result) => {
        if (result) {
          console.log("Product saved:", result);
          this.upload(result)
        }
      },
      () => {} // Handle modal dismissal
    );
  }

  upload(payload: any) {
    if (!payload.images || payload.images.length === 0) return;
  
    const uploadedImages: string[] = [];
    let uploadedCount = 0;
  
    payload.images.forEach((file: File, index: number) => {
      this.productService.uploadFile(file).subscribe({
        next: (response : any) => {
          console.log('File uploaded successfully', response);
          
          // Push uploaded file URL to images array
          uploadedImages.push(response.location);
          uploadedCount++;
  
          // If all images are uploaded, call addProduct
          if (uploadedCount === payload.images.length) {
            payload.images = uploadedImages; // Replace file list with uploaded URLs
            this.addProduct(payload);
          }
        },
        error: (error) => {
          console.error('Upload failed', error);
          alert('File upload failed!');
        }
      });
    });
  }
  
  addProduct(payload: any) {
    this.productService.addProduct(payload).subscribe({
      next: (res: any) => {
        console.log('Product added successfully', res);
      },
      error: (error) => {
        console.error('Error adding product', error);
      }
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
  
}
