import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Naruto Uzumaki',
      nameJapanese: 'うずまき ナルト',
      price: 19.99,
      originalPrice: 24.99,
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
      description: 'High-quality Naruto Uzumaki action figure with authentic details and premium craftsmanship.',
      category: 'Action Figures',
      inStock: true,
      stockQuantity: 15,
      rating: 4.8,
      reviews: 124,
      features: ['Articulated joints', 'Premium materials', 'Authentic design', 'Collector quality'],
      specifications: {
        'Height': '6 inches',
        'Material': 'PVC',
        'Age Range': '14+',
        'Brand': 'ShopEasy'
      },
      images: [
        'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
        'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg'
      ],
      tags: ['naruto', 'action figure', 'anime', 'collectible'],
      discount: 20
    },
    {
      id: 2,
      name: 'Sasuke Uchiha',
      nameJapanese: 'うちは サスケ',
      price: 29.99,
      originalPrice: 34.99,
      image: 'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg',
      description: 'Detailed Sasuke Uchiha figure featuring his iconic pose and Sharingan eyes.',
      category: 'Action Figures',
      inStock: true,
      stockQuantity: 8,
      rating: 4.9,
      reviews: 89,
      features: ['Sharingan eyes', 'Sword accessory', 'Multiple poses', 'Premium finish'],
      specifications: {
        'Height': '6.5 inches',
        'Material': 'PVC/ABS',
        'Age Range': '14+',
        'Brand': 'ShopEasy'
      },
      images: [
        'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg',
        'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg'
      ],
      tags: ['sasuke', 'uchiha', 'action figure', 'anime'],
      discount: 15
    },
    {
      id: 3,
      name: 'Kakashi Hatake',
      nameJapanese: 'カカシ 畑',
      price: 39.99,
      originalPrice: 44.99,
      image: 'https://images.pexels.com/photos/1337477/pexels-photo-1337477.jpeg',
      description: 'The Copy Ninja Kakashi with his signature mask and Sharingan eye revealed.',
      category: 'Action Figures',
      inStock: true,
      stockQuantity: 12,
      rating: 4.7,
      reviews: 156,
      features: ['Removable mask', 'Sharingan detail', 'Kunai accessories', 'Articulated design'],
      specifications: {
        'Height': '6.2 inches',
        'Material': 'PVC',
        'Age Range': '14+',
        'Brand': 'ShopEasy'
      },
      images: [
        'https://images.pexels.com/photos/1337477/pexels-photo-1337477.jpeg',
        'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg'
      ],
      tags: ['kakashi', 'copy ninja', 'action figure', 'sensei'],
      discount: 11
    },
    {
      id: 4,
      name: 'Rock Lee',
      nameJapanese: 'ロック・リー',
      price: 49.99,
      image: 'https://images.pexels.com/photos/1337477/pexels-photo-1337477.jpeg',
      description: 'Dynamic Rock Lee figure in his signature fighting stance with training weights.',
      category: 'Action Figures',
      inStock: true,
      stockQuantity: 6,
      rating: 4.6,
      reviews: 73,
      features: ['Dynamic pose', 'Training weights', 'Green jumpsuit', 'Bandage details'],
      specifications: {
        'Height': '6.3 inches',
        'Material': 'PVC/ABS',
        'Age Range': '14+',
        'Brand': 'ShopEasy'
      },
      images: [
        'https://images.pexels.com/photos/1337477/pexels-photo-1337477.jpeg'
      ],
      tags: ['rock lee', 'taijutsu', 'action figure', 'training']
    },
    {
      id: 5,
      name: 'Might Guy',
      nameJapanese: 'マイト・ガイ',
      price: 49.99,
      image: 'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg',
      description: 'The Green Beast of Konoha in his most powerful form with flame effects.',
      category: 'Action Figures',
      inStock: true,
      stockQuantity: 4,
      rating: 4.9,
      reviews: 92,
      features: ['Flame effects', 'Eight Gates pose', 'Detailed muscles', 'Premium quality'],
      specifications: {
        'Height': '6.8 inches',
        'Material': 'PVC',
        'Age Range': '14+',
        'Brand': 'ShopEasy'
      },
      images: [
        'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg'
      ],
      tags: ['might guy', 'eight gates', 'sensei', 'flame']
    },
    {
      id: 6,
      name: 'Gaara',
      nameJapanese: '柄',
      price: 49.99,
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
      description: 'Gaara of the Sand with his signature gourd and sand manipulation effects.',
      category: 'Action Figures',
      inStock: true,
      stockQuantity: 7,
      rating: 4.8,
      reviews: 68,
      features: ['Sand gourd', 'Sand effects', 'Kazekage outfit', 'Detailed tattoo'],
      specifications: {
        'Height': '6.4 inches',
        'Material': 'PVC/ABS',
        'Age Range': '14+',
        'Brand': 'ShopEasy'
      },
      images: [
        'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg'
      ],
      tags: ['gaara', 'sand', 'kazekage', 'desert']
    }
  ];

  private productsSubject = new BehaviorSubject<Product[]>(this.products);
  public products$ = this.productsSubject.asObservable();

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  getProduct(id: number): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    const filteredProducts = this.products.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );
    return of(filteredProducts);
  }

  searchProducts(query: string): Observable<Product[]> {
    const searchResults = this.products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.nameJapanese.includes(query) ||
      p.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    return of(searchResults);
  }

  getFeaturedProducts(): Observable<Product[]> {
    const featured = this.products.filter(p => p.rating >= 4.7);
    return of(featured);
  }

  getCategories(): Observable<string[]> {
    const categories = [...new Set(this.products.map(p => p.category))];
    return of(categories);
  }
}