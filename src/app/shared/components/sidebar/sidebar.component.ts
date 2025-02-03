import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/layout/modules/product/services/product.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private productService : ProductService){}
  ngOnInit(): void {
    this.getAllCategories();
  }
  categories : any[] = [];
  selectedCategories = [];
  priceRange = 500;
  
  isCategoryOpen = false;
  isPriceOpen = false;

  toggleCategory() {
    this.isCategoryOpen = !this.isCategoryOpen;
  }

  togglePrice() {
    this.isPriceOpen = !this.isPriceOpen;
  }

  onFilterChange() {
    // Apply filters based on selected categories or price range
    console.log(this.selectedCategories, this.priceRange);
  }

  getAllCategories(){
    this.productService.getAllCategories().subscribe((res:any) =>{
      this.categories = res;
    })
  }

  resetFilters() {
    this.selectedCategories = [];
    this.priceRange = 500;
    console.log('Filters reset');
  }
}
