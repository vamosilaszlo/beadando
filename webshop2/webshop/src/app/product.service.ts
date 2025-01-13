import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://dolgozat-79584-default-rtdb.europe-west1.firebasedatabase.app/.json';

  constructor(private http: HttpClient) {}



  // GET: Termékek lekérése
  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // POST: Új termék hozzáadása
  addProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  // PUT: Termék frissítése
  updateProduct(id: string, product: any): Observable<any> {
    const url = `https://dolgozat-79584-default-rtdb.europe-west1.firebasedatabase.app/${id}.json`;
    return this.http.put(url, product);
  }

  // DELETE: Termék törlése
  deleteProduct(id: string): Observable<any> {
    const url = `https://dolgozat-79584-default-rtdb.europe-west1.firebasedatabase.app/${id}.json`;
    return this.http.delete(url);
  }
}
