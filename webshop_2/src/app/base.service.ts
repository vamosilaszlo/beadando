import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, Subject } from 'rxjs';
import { ProductsListComponent } from './products-list/products-list.component';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  // url="https://jsonplaceholder.typicode.com/albums/"
  url="https://dolgozat-79584-default-rtdb.europe-west1.firebasedatabase.app./"
adatSub=new Subject()



  constructor(private http:HttpClient) {
    this.downloadAll()
  }

  getAll(){
    return this.adatSub
  }

  private downloadAll(){
    this.http.get(this.url+".json").subscribe(
      (res:any)=>{
          let adattomb=[]
          for (const key in res) {
            adattomb.push({azon:key, ...res[key]})
            }
          this.adatSub.next(adattomb)
          }


    )
  }

  newData(data:any){
    this.http.post(this.url+".json",data).forEach(
      ()=>this.downloadAll()
    )
  }
  updateData(data:any){
    this.http.put(this.url+data.azon+".json",data).forEach(
      ()=>this.downloadAll()
    )
  }

  deleteData(data:any){
    this.http.delete(this.url+data.azon+".json").forEach(
      ()=>this.downloadAll()
    )
  }
}
