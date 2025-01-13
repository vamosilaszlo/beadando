import { Component } from '@angular/core';
import { KosarService } from '../kosar.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart:any
  constructor(private kosar:KosarService){
    this.kosar.getCart().subscribe(
      (res:any)=>this.cart=res
    )
  }
}
