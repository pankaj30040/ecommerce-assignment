import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  cartCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.cartService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });
  }

  increaseQuantity(item: any) {
    this.cartService.increaseQuantity(item);
  }

  decreaseQuantity(item: any) {
    this.cartService.decreaseQuantity(item);
  }

  removeItem(item: any) {
    this.cartService.removeFromCart(this.cartItems.indexOf(item));
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
