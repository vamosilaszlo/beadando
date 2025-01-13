import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KosarService {
  private cart:any=[]
  kosarSub=new Subject()

  constructor() { }

  addProduct(product:any){
    // console.log(product)
    // console.log(this.cart)
    // let f = this.cart.filter(
    //   (t:any)=>t.id==product.id
    // )
    let i = this.cart.findIndex(
      (t:any)=>t.id==product.id
    )
    console.log("index:", i)

    if (i>=0)
      this.cart[i].db++
    else {
      product.db=1
      this.cart.push(product) 
    }


    
    this.kosarSub.next(this.cart)
  }

  getCart(){
    return this.kosarSub
  }
}
