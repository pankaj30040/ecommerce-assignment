import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: any[] = [];
  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable(); // Expose cart count as an observable

  constructor() {
    this.loadCartFromStorage(); // Load cart on service initialization
  }

  // Get cart items
  getCartItems() {
    return this.cart;
  }

  // Add product to cart
  addToCart(product: any) {
    let existingProduct = this.cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }

    this.saveCartToStorage();
    this.updateCartCount();
  }

  // Remove product from cart
  removeFromCart(index: number) {
    this.cart.splice(index, 1);
    this.saveCartToStorage();
    this.updateCartCount();
  }

  // Increase product quantity
  increaseQuantity(product: any) {
    product.quantity++;
    this.saveCartToStorage();
    this.updateCartCount();
  }

  // Decrease product quantity
  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
    } else {
      this.cart = this.cart.filter((item) => item.id !== product.id);
    }
    this.saveCartToStorage();
    this.updateCartCount();
  }

  // Get total cart price
  getTotalPrice(): number {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Clear cart
  clearCart() {
    this.cart = [];
    this.saveCartToStorage();
    this.cartCount.next(0);
  }

  // Update cart count
  private updateCartCount() {
    const count = this.cart.reduce((total, item) => total + item.quantity, 0);
    this.cartCount.next(count);
  }

  // Save cart to localStorage
  private saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  // Load cart from localStorage
  private loadCartFromStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
      this.updateCartCount();
    }
  }
}
