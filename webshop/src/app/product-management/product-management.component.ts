import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

interface Product {
  id?: number;
  name: string;
  category: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = { name: '', category: '', description: '', price: 0 };
  editingProduct: Product | null = null;

  constructor(private http: HttpClient, private translate: TranslateService) {
    this.translate.setDefaultLang('hu');
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.http.get<{ [key: string]: Product }>('https://dolgozat-79584-default-rtdb.europe-west1.firebasedatabase.app/.json')
      .subscribe(data => {
        this.products = Object.keys(data || {}).map(key => ({
          id: +key,
          ...data[key]
        }));
      });
  }

  addProduct(): void {
    this.http.post('https://dolgozat-79584-default-rtdb.europe-west1.firebasedatabase.app/.json', this.newProduct)
      .subscribe(() => {
        this.loadProducts();
        this.newProduct = { name: '', category: '', description: '', price: 0 };
      });
  }

  deleteProduct(id: number | undefined): void {
    if (id === undefined) return;
    this.http.delete(`https://dolgozat-79584-default-rtdb.europe-west1.firebasedatabase.app/${id}.json`)
      .subscribe(() => this.loadProducts());
  }

  startEdit(product: Product): void {
    this.editingProduct = { ...product };
  }

  updateProduct(): void {
    if (this.editingProduct && this.editingProduct.id !== undefined) {
      const id = this.editingProduct.id;
      this.http.put(`https://dolgozat-79584-default-rtdb.europe-west1.firebasedatabase.app/${id}.json`, this.editingProduct)
        .subscribe(() => {
          this.loadProducts();
          this.editingProduct = null;
        });
    }
  }

  cancelEdit(): void {
    this.editingProduct = null;
  }
}
