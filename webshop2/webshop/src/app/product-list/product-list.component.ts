import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service'; // Ne felejtsd el a helyes elérési utat

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error: any) => {  // Az error típusát most expliciten definiáljuk
        console.error('Hiba történt a termékek lekérésekor', error);
      }
    );
  }
}
