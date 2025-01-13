import { Component, Input } from '@angular/core';
import { KosarService } from '../kosar.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent { 
  @Input() products:any

  constructor(private kosar:KosarService){}

  addProduct(product:any){
    this.kosar.addProduct(product)
  }
}
