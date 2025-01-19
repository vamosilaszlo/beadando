import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  menuItems: any = new BehaviorSubject([])
  buttons: any = new BehaviorSubject({}); 

  constructor(private http: HttpClient) {
    this.loadConfigJson("hu")
  }

  private loadConfigJson(lang: string) {
    this.http.get("assets/lang_" + lang + ".json").subscribe((res: any) => {
      this.menuItems.next(res);
      this.buttons.next(res.buttons); 
    }
    )
  }

  public getLinks() {
    return this.menuItems
  }

  public setLang(lang: string) {
    this.loadConfigJson(lang)
  }

  public getButtons() {
    return this.buttons;
  }
}
