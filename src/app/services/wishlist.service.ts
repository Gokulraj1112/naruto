import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, WishlistItem } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistItems: WishlistItem[] = [];
  private wishlistSubject = new BehaviorSubject<WishlistItem[]>([]);
  public wishlist$ = this.wishlistSubject.asObservable();

  constructor() {
    this.loadWishlistFromStorage();
  }

  private loadWishlistFromStorage(): void {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      this.wishlistItems = JSON.parse(savedWishlist);
      this.wishlistSubject.next(this.wishlistItems);
    }
  }

  private saveWishlistToStorage(): void {
    localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems));
    this.wishlistSubject.next(this.wishlistItems);
  }

  addToWishlist(product: Product): void {
    const existingItem = this.wishlistItems.find(item => item.product.id === product.id);
    
    if (!existingItem) {
      this.wishlistItems.push({ product, addedDate: new Date() });
      this.saveWishlistToStorage();
    }
  }

  removeFromWishlist(productId: number): void {
    this.wishlistItems = this.wishlistItems.filter(item => item.product.id !== productId);
    this.saveWishlistToStorage();
  }

  getWishlistItems(): Observable<WishlistItem[]> {
    return this.wishlist$;
  }

  isInWishlist(productId: number): boolean {
    return this.wishlistItems.some(item => item.product.id === productId);
  }

  getWishlistCount(): number {
    return this.wishlistItems.length;
  }

  clearWishlist(): void {
    this.wishlistItems = [];
    this.saveWishlistToStorage();
  }
}