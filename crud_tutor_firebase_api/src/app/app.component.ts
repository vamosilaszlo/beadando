import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crud_tutor';
  parent_data='parent data 1959'
  message = 'gyerektől:';
  receiveMessage(event: string) {
    this.message = event.toUpperCase();  // A gyermek által küldött üzenet fogadása

    
  }


}
