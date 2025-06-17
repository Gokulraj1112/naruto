import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notification.service';
import { NotificationComponent } from '../../components/notification/notification.component';
import { CartItem } from '../../models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, NotificationComponent],
  template: `
    <app-notification></app-notification>
    
    <div class="cart-page">
      <div class="container">
        <div class="page-header">
          <h1>Shopping Cart</h1>
          <p *ngIf="cartItems$ | async as items">{{items.length}} items in your cart</p>
        </div>

        <div class="cart-content" *ngIf="cartItems$ | async as items">
          <div class="cart-items" *ngIf="items.length > 0; else emptyCart">
            <div class="cart-item" *ngFor="let item of items" class="fade-in">
              <div class="item-image">
                <img [src]="item.product.image" [alt]="item.product.name">
              </div>
              
              <div class="item-details">
                <h3>
                  <a [routerLink]="['/product', item.product.id]">{{item.product.name}}</a>
                </h3>
                <p class="japanese-name">{{item.product.nameJapanese}}</p>
                <p class="item-category">{{item.product.category}}</p>
                
                <div class="item-rating">
                  <div class="stars">
                    <i class="fas fa-star" *ngFor="let star of getStars(item.product.rating)"></i>
                    <i class="far fa-star" *ngFor="let star of getEmptyStars(item.product.rating)"></i>
                  </div>
                  <span>({{item.product.reviews}} reviews)</span>
                </div>
              </div>
              
              <div class="item-quantity">
                <label>Quantity:</label>
                <div class="quantity-controls">
                  <button (click)="decreaseQuantity(item)" [disabled]="item.quantity <= 1">
                    <i class="fas fa-minus"></i>
                  </button>
                  <span class="quantity">{{item.quantity}}</span>
                  <button (click)="increaseQuantity(item)" [disabled]="item.quantity >= item.product.stockQuantity">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              
              <div class="item-price">
                <div class="price-info">
                  <span class="unit-price">\${{item.product.price}} each</span>
                  <span class="total-price">\${{(item.product.price * item.quantity).toFixed(2)}}</span>
                </div>
              </div>
              
              <div class="item-actions">
                <button class="remove-btn" (click)="removeItem(item)" title="Remove from cart">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>

          <ng-template #emptyCart>
            <div class="empty-cart">
              <i class="fas fa-shopping-cart"></i>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added any items to your cart yet.</p>
              <a routerLink="/products" class="btn btn-primary">Start Shopping</a>
            </div>
          </ng-template>

          <div class="cart-summary" *ngIf="items.length > 0">
            <div class="summary-card">
              <h3>Order Summary</h3>
              
              <div class="summary-row">
                <span>Subtotal ({{getTotalItems()}} items):</span>
                <span>\${{getSubtotal().toFixed(2)}}</span>
              </div>
              
              <div class="summary-row">
                <span>Shipping:</span>
                <span *ngIf="getSubtotal() >= 50; else shippingCost">Free</span>
                <ng-template #shippingCost>
                  <span>\$5.99</span>
                </ng-template>
              </div>
              
              <div class="summary-row">
                <span>Tax:</span>
                <span>\${{getTax().toFixed(2)}}</span>
              </div>
              
              <hr>
              
              <div class="summary-row total">
                <span>Total:</span>
                <span>\${{getTotal().toFixed(2)}}</span>
              </div>
              
              <div class="shipping-notice" *ngIf="getSubtotal() < 50">
                <i class="fas fa-info-circle"></i>
                Add \${{(50 - getSubtotal()).toFixed(2)}} more for free shipping!
              </div>
              
              <div class="summary-actions">
                <button class="btn btn-outline" (click)="clearCart()">Clear Cart</button>
                <a routerLink="/checkout" class="btn btn-primary">Proceed to Checkout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cart-page {
      padding: 2rem 0;
      min-height: 80vh;
    }

    .page-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .page-header h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #374151;
      margin-bottom: 0.5rem;
    }

    .page-header p {
      color: #6b7280;
      font-size: 1.1rem;
    }

    .cart-content {
      display: grid;
      grid-template-columns: 1fr 400px;
      gap: 2rem;
      align-items: start;
    }

    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .cart-item {
      display: grid;
      grid-template-columns: 120px 1fr auto auto auto;
      gap: 1.5rem;
      align-items: center;
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
    }

    .cart-item:hover {
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    }

    .item-image img {
      width: 100%;
      height: 120px;
      object-fit: cover;
      border-radius: 8px;
    }

    .item-details h3 {
      margin-bottom: 0.5rem;
    }

    .item-details h3 a {
      color: #374151;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.3s ease;
    }

    .item-details h3 a:hover {
      color: #667eea;
    }

    .japanese-name {
      color: #6b7280;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }

    .item-category {
      color: #9ca3af;
      font-size: 0.875rem;
      text-transform: uppercase;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    .item-rating {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
    }

    .stars {
      color: #fbbf24;
    }

    .item-rating span {
      color: #6b7280;
    }

    .item-quantity label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #374151;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: #f3f4f6;
      border-radius: 8px;
      padding: 0.25rem;
    }

    .quantity-controls button {
      width: 32px;
      height: 32px;
      border: none;
      background: white;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .quantity-controls button:hover:not(:disabled) {
      background: #667eea;
      color: white;
    }

    .quantity-controls button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .quantity {
      min-width: 40px;
      text-align: center;
      font-weight: 600;
    }

    .item-price {
      text-align: right;
    }

    .unit-price {
      display: block;
      color: #6b7280;
      font-size: 0.875rem;
      margin-bottom: 0.25rem;
    }

    .total-price {
      font-size: 1.25rem;
      font-weight: 700;
      color: #667eea;
    }

    .remove-btn {
      width: 40px;
      height: 40px;
      border: none;
      background: #fee2e2;
      color: #dc2626;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .remove-btn:hover {
      background: #dc2626;
      color: white;
    }

    .empty-cart {
      text-align: center;
      padding: 4rem 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    .empty-cart i {
      font-size: 4rem;
      color: #d1d5db;
      margin-bottom: 1rem;
    }

    .empty-cart h2 {
      font-size: 1.5rem;
      color: #374151;
      margin-bottom: 0.5rem;
    }

    .empty-cart p {
      color: #6b7280;
      margin-bottom: 2rem;
    }

    .cart-summary {
      position: sticky;
      top: 100px;
    }

    .summary-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    .summary-card h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: #374151;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .summary-row.total {
      font-size: 1.25rem;
      font-weight: 700;
      color: #374151;
    }

    .shipping-notice {
      background: #eff6ff;
      color: #1d4ed8;
      padding: 1rem;
      border-radius: 8px;
      margin: 1rem 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
    }

    .summary-actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 2rem;
    }

    @media (max-width: 768px) {
      .cart-content {
        grid-template-columns: 1fr;
      }
      
      .cart-item {
        grid-template-columns: 80px 1fr;
        gap: 1rem;
      }
      
      .item-quantity,
      .item-price,
      .item-actions {
        grid-column: 1 / -1;
        justify-self: start;
      }
      
      .item-price {
        text-align: left;
      }
    }
  `]
})
export class CartComponent implements OnInit {
  cartItems$!: Observable<CartItem[]>;

  constructor(
    private cartService: CartService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartService.getCartItems();
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  increaseQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.product.id, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.product.id, item.quantity - 1);
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.product.id);
    this.notificationService.info(`${item.product.name} removed from cart`);
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.notificationService.info('Cart cleared');
  }

  getTotalItems(): number {
    return this.cartService.getCartItemCount();
  }

  getSubtotal(): number {
    return this.cartService.getCartTotal();
  }

  getTax(): number {
    return this.getSubtotal() * 0.08; // 8% tax
  }

  getShipping(): number {
    return this.getSubtotal() >= 50 ? 0 : 5.99;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getTax() + this.getShipping();
  }
}