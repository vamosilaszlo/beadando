import { ProductsListComponent } from './../products-list/products-list.component';
import { Component } from '@angular/core';
import { ConfigService } from '../config.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  links:any
  dropClose=true
  lang="Magyar"

  constructor(private config:ConfigService){
    this.config.getLinks().subscribe(
      (res:any)=>this.links=res["menuItems"]
    )


  }

  setLang(lang:string){
    this.lang=lang=="hu"?"Magyar":"English"
    this.config.setLang(lang)
    this.dropClose=true
  }





}
