import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <a routerLink="/">
              ShopEasy
              <sub>[買い物がしやすい]</sub>
            </a>
          </div>
          
          <nav class="nav" [class.nav-open]="isMenuOpen">
            <ul>
              <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a></li>
              <li><a routerLink="/products" routerLinkActive="active">Products</a></li>
              <li><a routerLink="/about" routerLinkActive="active">About</a></li>
              <li><a routerLink="/contact" routerLinkActive="active">Contact</a></li>
            </ul>
          </nav>
          
          <div class="header-actions">
            <a routerLink="/wishlist" class="action-btn" title="Wishlist">
              <i class="fas fa-heart"></i>
              <span class="badge" *ngIf="(wishlistCount$ | async)! > 0">{{ wishlistCount$ | async }}</span>
            </a>
            
            <a routerLink="/cart" class="action-btn" title="Shopping Cart">
              <i class="fas fa-shopping-cart"></i>
              <span class="badge" *ngIf="(cartCount$ | async)! > 0">{{ cartCount$ | async }}</span>
            </a>
            
            <a routerLink="/auth" class="action-btn" title="Account">
              <i class="fas fa-user"></i>
            </a>
            
            <button class="mobile-menu-btn" (click)="toggleMenu()">
              <i class="fas" [class.fa-bars]="!isMenuOpen" [class.fa-times]="isMenuOpen"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      z-index: 1000;
      transition: all 0.3s ease;
    }

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 0;
    }

    .logo a {
      font-size: 1.8rem;
      font-weight: 700;
      color: #667eea;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .logo a:hover {
      color: #764ba2;
    }

    .logo sub {
      font-size: 0.8rem;
      color: #6b7280;
      font-weight: 400;
    }

    .nav ul {
      display: flex;
      list-style: none;
      gap: 2rem;
      margin: 0;
      padding: 0;
    }

    .nav a {
      text-decoration: none;
      color: #374151;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      transition: all 0.3s ease;
      position: relative;
    }

    .nav a:hover,
    .nav a.active {
      color: #667eea;
      background: rgba(102, 126, 234, 0.1);
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .action-btn {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(102, 126, 234, 0.1);
      color: #667eea;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .action-btn:hover {
      background: #667eea;
      color: white;
      transform: scale(1.1);
    }

    .badge {
      position: absolute;
      top: -5px;
      right: -5px;
      background: #ef4444;
      color: white;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 10px;
      min-width: 18px;
      text-align: center;
    }

    .mobile-menu-btn {
      display: none;
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #374151;
      cursor: pointer;
    }

    @media (max-width: 768px) {
      .nav {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }

      .nav.nav-open {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }

      .nav ul {
        flex-direction: column;
        padding: 1rem;
        gap: 0;
      }

      .nav a {
        display: block;
        padding: 1rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }

      .mobile-menu-btn {
        display: block;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  cartCount$!: Observable<number>;
  wishlistCount$!: Observable<number>;

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.cartCount$ = this.cartService.cart$.pipe(
      map(items => items.reduce((count, item) => count + item.quantity, 0))
    );

    this.wishlistCount$ = this.wishlistService.wishlist$.pipe(
      map(items => items.length)
    );
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}