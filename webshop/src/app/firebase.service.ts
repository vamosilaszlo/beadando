import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Product {
  id?: number;
  category: string;
  description: string;
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private dbPath = '/products';
  constructor(private db: AngularFireDatabase) { }

  // Get all products
  getAllProducts(): Observable<Product[]> {
    return this.db.list<Product>(this.dbPath).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.val();
        const id = a.key;
        return { id, ...data };
      }))
    );
  }

  // Create new product
  createProduct(product: Product): void {
    const productRef = this.db.list(this.dbPath);
    productRef.push(product);
  }

  // Update product
  updateProduct(id: string, product: Product): void {
    const productRef = this.db.object(`${this.dbPath}/${id}`);
    productRef.update(product);
  }

  // Delete product
  deleteProduct(id: string): void {
    const productRef = this.db.object(`${this.dbPath}/${id}`);
    productRef.remove();
  }
}

