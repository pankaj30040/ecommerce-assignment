import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss']
})
export class AddUpdateProductComponent implements OnInit {

  @Input() productData: any; // Will receive data when updating
  productForm!: FormGroup;
  imagePreviews: string[] = [];
  categories : any;
  constructor(public activeModal: NgbActiveModal,
    private fb: FormBuilder, private productService : ProductService
  ){}
  ngOnInit(): void {
    this.getAllCategories();
    this.productForm = this.fb.group({
      title: [this.productData?.title || '', Validators.required],
      price: [this.productData?.price || '', [Validators.required, Validators.min(1)]],
      description: [this.productData?.description || '', Validators.required],
      categoryId: [this.productData?.categoryId || '', Validators.required],
      images: [[]]
    });

    // Load existing images for update
    if (this.productData?.images) {
      this.imagePreviews = this.productData.images;
    }
  }

  // Handle Image Selection
  onImageChange(event: any): void {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      files.forEach((file: any) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });

      this.productForm.patchValue({ images: this.imagePreviews });
    }
  }

  // Submit the form
  onSubmit(): void {
    if (this.productForm.valid) {
      console.log("Product Data:", this.productForm.value);
      this.activeModal.close(this.productForm.value); // Pass data back on close
    }
  }

  // Remove selected image
  removeImage(index: number): void {
    this.imagePreviews.splice(index, 1);
    this.productForm.patchValue({ images: this.imagePreviews });
  }

  getAllCategories(){
    this.productService.getAllCategories().subscribe((res:any) =>{
      this.categories = res;
    })
  }
}
