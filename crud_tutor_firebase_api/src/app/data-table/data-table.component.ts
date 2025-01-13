import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit {
  data: { id: number; name: string; age: number }[] = [];
  newName = '';
  newAge = 0;
  errorMessage = '';
  id: string | undefined;
  apiurl = this.dataService.apiUrl;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    // this.data = this.dataService.getData();
    this.loadData();
  }
  loadData(): void {
    this.dataService.getData().subscribe(
      (data) => {
        this.data = data;
      },
      (error) => {
        console.error('Hiba történt az adatok betöltésekor:', error);
        this.errorMessage =
          'A szerver nem érhető el. Kérem, próbálja újra később.'; // Hibát állítunk be
      }
    );
  }

  addData(name: string, age: number): void {
    if (!name) {
      this.errorMessage = 'A név és életkor mező kitöltése kötelező!';
      return;
    }
    const isValidName = /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ\s]+$/.test(name);
    if (!isValidName) {
      this.errorMessage = 'A név csak betűket tartalmazhat!';
      return;
    }

    if (String(age).length ==0) {
      this.errorMessage = 'Az életkor mező kitöltése kötelező!';
      return;
    }

    const isValidAge = /^[+-]?[0-9]+$/.test(String(age));
    if (!isValidAge) {
      this.errorMessage = 'A életkor csak számokat tartalmazhat!';
      return;
    }
    if (age <= 0) {
      this.errorMessage = 'Az nullánál nagyobb legyen!';
      return;
    }

    const newData = { name, age };
    this.dataService.addData(newData).subscribe(
      () => {
        this.loadData();
        this.newName = '';
        this.newAge = 0;
        this.errorMessage = '';
      },
      (error) => {
        console.error('Hiba történt az új adat hozzáadása során:', error);
      }
    );
  }

  updateData(
    index: number,
    person: { id: number; name: string; age: number }
  ): void {
    if (!person.name) {
      this.errorMessage = 'A név és életkor mező kitöltése kötelező!';
      return;
    }
    if (person.age == null) {
      this.errorMessage = 'Az életkor mező kitöltése kötelező!';
      return;
    }
    if (person.age <= 0) {
      this.errorMessage = 'Az életkor mező nullánál nagyobb legyen!';
      return;
    }
    this.dataService.updateData(person.id, person).subscribe(
      () => {
        this.loadData();
        this.errorMessage = '';
      },
      (error) => {
        console.error('Hiba történt az adat frissítésekor:', error);
      }
    );
  }

  deleteData(index: number): void {
    const person = this.data[index];
    console.log('Törlendő személy:', person);

    if (!person || !person.id) {
      this.errorMessage = 'A törölni kívánt adat nem található.';
      return;
    }

    this.dataService.deleteData(person.id).subscribe({
      next: () => {
        console.log('Törlés sikeres.');
        this.loadData();
      },
      error: (error) => {
        console.error('Hiba történt:', error);
      },
    });
  }
}
