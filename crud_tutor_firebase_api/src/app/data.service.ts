import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Globális regisztráció
})
export class DataService {
   //apiUrl = 'http://localhost:3000/api/data'; // EXPRES szerver, JSON Server URL
  // private apiUrl = 'assets/db.json';
  // private apiUrl = 'http://localhost/api/api.php'; // XAMPP backend URL
  //  apiUrl="http://localhost:8000/api/szemelyek"
  //  apiUrl="http://localhost/angular_laravel/be/public/api/szemelyek"
   apiUrl="http://www.webshop.webtelek.hu/uj4/angular_laravel/be/public/api/szemelyek"


  private data: { id: number; name: string; age: number }[] = [];

  constructor(private http: HttpClient) {}

  // Adatok lekérése
  getData(): Observable<{ id: number; name: string; age: number }[]> {
    return this.http.get<{ id: number; name: string; age: number }[]>(
      this.apiUrl
    );
  }

  // Új adat hozzáadása
  addData(data: {
    // id: number;
    name: string;
    age: number;
  }): Observable<{ id: number; name: string; age: number }> {
    return this.http.post<{ id: number; name: string; age: number }>(
      this.apiUrl,
      data
    );
  }

  // Adat frissítése
  updateData(
    id: number,
    data: { id: number; name: string; age: number }
  ): Observable<{ id: number; name: string; age: number }> {
    return this.http.put<{ id: number; name: string; age: number }>(
      `${this.apiUrl}/${id}`,
      data
    );
  }

  // Adat törlése
  deleteData(
    id: number
  ): Observable<{ id: number; name: string; age: number }> {
    return this.http.delete<{ id: number; name: string; age: number }>(
      `${this.apiUrl}/${id}`
    );
  }
}

