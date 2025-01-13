import { Component } from '@angular/core';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  products:any
  constructor(private base:BaseService){
    this.base.getProducts().subscribe(
      (res)=>this.products=res
    )
  }

}
