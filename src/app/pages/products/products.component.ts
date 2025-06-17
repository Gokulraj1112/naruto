import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { NotificationComponent } from '../../components/notification/notification.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent, NotificationComponent],
  template: `
    <app-notification></app-notification>
    
    <div class="products-page">
      <div class="container">
        <!-- Page Header -->
        <div class="page-header">
          <h1>Our Products</h1>
          <p>Discover our complete collection of anime merchandise</p>
        </div>

        <!-- Filters and Search -->
        <div class="filters-section">
          <div class="search-bar">
            <div class="search-input-wrapper">
              <i class="fas fa-search"></i>
              <input 
                type="text" 
                placeholder="Search products..." 
                class="form-input"
                [(ngModel)]="searchQuery"
                (input)="onSearchChange()"
              >
            </div>
          </div>
          
          <div class="filters">
            <div class="filter-group">
              <label>Category:</label>
              <select class="form-input" [(ngModel)]="selectedCategory" (change)="onFilterChange()">
                <option value="">All Categories</option>
                <option *ngFor="let category of categories$ | async" [value]="category">{{category}}</option>
              </select>
            </div>
            
            <div class="filter-group">
              <label>Sort by:</label>
              <select class="form-input" [(ngModel)]="sortBy" (change)="onFilterChange()">
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="newest">Newest</option>
              </select>
            </div>
            
            <div class="filter-group">
              <label>Price Range:</label>
              <div class="price-range">
                <input 
                  type="number" 
                  placeholder="Min" 
                  class="form-input price-input"
                  [(ngModel)]="minPrice"
                  (input)="onFilterChange()"
                >
                <span>-</span>
                <input 
                  type="number" 
                  placeholder="Max" 
                  class="form-input price-input"
                  [(ngModel)]="maxPrice"
                  (input)="onFilterChange()"
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="products-section">
          <div class="products-header">
            <span class="results-count" *ngIf="filteredProducts$ | async as products">
              Showing {{products.length}} products
            </span>
            
            <div class="view-toggle">
              <button 
                class="view-btn" 
                [class.active]="viewMode === 'grid'"
                (click)="setViewMode('grid')"
              >
                <i class="fas fa-th"></i>
              </button>
              <button 
                class="view-btn" 
                [class.active]="viewMode === 'list'"
                (click)="setViewMode('list')"
              >
                <i class="fas fa-list"></i>
              </button>
            </div>
          </div>
          
          <div 
            class="products-grid" 
            [class.grid-view]="viewMode === 'grid'"
            [class.list-view]="viewMode === 'list'"
          >
            <app-product-card 
              *ngFor="let product of filteredProducts$ | async; trackBy: trackByProductId" 
              [product]="product"
              class="fade-in">
            </app-product-card>
          </div>
          
          <div class="no-products" *ngIf="(filteredProducts$ | async)?.length === 0">
            <i class="fas fa-search"></i>
            <h3>No products found</h3>
            <p>Try adjusting your search criteria or filters</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .products-page {
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
      font-size: 1.1rem;
      color: #6b7280;
    }

    .filters-section {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      margin-bottom: 2rem;
    }

    .search-bar {
      margin-bottom: 1.5rem;
    }

    .search-input-wrapper {
      position: relative;
      max-width: 400px;
    }

    .search-input-wrapper i {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #6b7280;
    }

    .search-input-wrapper .form-input {
      padding-left: 3rem;
    }

    .filters {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }

    .filter-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #374151;
    }

    .price-range {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .price-input {
      flex: 1;
    }

    .products-section {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      overflow: hidden;
    }

    .products-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 2rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .results-count {
      font-weight: 500;
      color: #374151;
    }

    .view-toggle {
      display: flex;
      gap: 0.5rem;
    }

    .view-btn {
      padding: 0.5rem;
      background: none;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      color: #6b7280;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .view-btn.active,
    .view-btn:hover {
      background: #667eea;
      color: white;
      border-color: #667eea;
    }

    .products-grid {
      padding: 2rem;
    }

    .products-grid.grid-view {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .products-grid.list-view {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .no-products {
      text-align: center;
      padding: 4rem 2rem;
      color: #6b7280;
    }

    .no-products i {
      font-size: 3rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }

    .no-products h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    @media (max-width: 768px) {
      .filters {
        grid-template-columns: 1fr;
      }
      
      .products-header {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
      }
      
      .products-grid.grid-view {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
      }
    }
  `]
})
export class ProductsComponent implements OnInit {
  products$!: Observable<Product[]>;
  categories$!: Observable<string[]>;
  filteredProducts$!: Observable<Product[]>;

  searchQuery = '';
  selectedCategory = '';
  sortBy = 'name';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  viewMode: 'grid' | 'list' = 'grid';

  private filtersSubject = new BehaviorSubject<any>({});

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
    this.categories$ = this.productService.getCategories();
    
    this.filteredProducts$ = combineLatest([
      this.products$,
      this.filtersSubject.asObservable()
    ]).pipe(
      map(([products, filters]) => this.applyFilters(products))
    );
  }

  onSearchChange(): void {
    this.updateFilters();
  }

  onFilterChange(): void {
    this.updateFilters();
  }

  private updateFilters(): void {
    this.filtersSubject.next({
      searchQuery: this.searchQuery,
      selectedCategory: this.selectedCategory,
      sortBy: this.sortBy,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    });
  }

  private applyFilters(products: Product[]): Product[] {
    let filtered = [...products];

    // Search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.nameJapanese.includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(product => product.category === this.selectedCategory);
    }

    // Price range filter
    if (this.minPrice !== null) {
      filtered = filtered.filter(product => product.price >= this.minPrice!);
    }
    if (this.maxPrice !== null) {
      filtered = filtered.filter(product => product.price <= this.maxPrice!);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.reviews - a.reviews; // Using reviews as proxy for newness
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }

  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}