import { ConfigService } from './../config.service';
import { Component } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {
  columns: any
  items: any = []
  oszlopok = ["name", "category", "description", "price"]
  adattomb: any = []
  HozzaAdas = "Hozzáadás"
  Modositas = "Módosítás"
  Torles = "Törlés"

  links: any
  dropClose = true
  lang = "Magyar"

  gombAtallit = true
  buttons: any = {};
  cikkek: any
  newCikk: any = {}

  constructor(
    public base: BaseService,
    private config: ConfigService,
    private http: HttpClient) {
    this.base.getAll().subscribe(
      (res) => this.cikkek = res
    )
    this.config.getLinks().subscribe(
      (res: any) => this.links = res["menuItems"]
    )
    this.config.getLinks().subscribe(
      (res: any) => this.columns = res["columns"]
    )

   this.config.getButtons().subscribe((res: any) => {
      this.buttons = res; 
    });
  }

  updateData(data: any) {
    this.base.updateData(data)
  }

  deleteData(data: any) {
    this.base.deleteData(data)
  }

  newData() {
    this.base.newData(this.newCikk)
    this.newCikk = {}
  }

  showDatas() {
    this.base.getAll().subscribe(
      (res) => this.cikkek = res
    )
  }
  gombBeallitasa(lang: string) {
    this.lang = lang == "hu" ? "Magyar" : "English"
    this.config.setLang(lang)
    this.dropClose = true

    if (lang == "hu") {
      this.gombAtallit = true;
    }
    else {
      this.gombAtallit = false;
    }
  }

}
