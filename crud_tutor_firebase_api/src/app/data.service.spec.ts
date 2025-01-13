// import { TestBed } from '@angular/core/testing';

// import { DataService } from './data.service';

// describe('DataService', () => {
//   let service: DataService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(DataService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Globális regisztráció
})
export class DataService {
  private data: any[] = [
    { id: 1, name: "Feri", age: 25 },
    { id: 2, name: "Jóska", age: 20 },
    { id: 3, name: "Kati", age: 19 },
    { id: 4, name: "Marci", age: 26 },
    { id: 5, name: "Laci", age: 22 },
    { id: 6, name: "Mari", age: 21 },
    { id: 7, name: "Zoli", age: 23 },
    { id: 8, name: "Sára", age: 18 },
    { id: 9, name: "Lili", age: 17 },
  ];

  getData() {
    return this.data;
  }

  addData(newData: any) {
    this.data.push(newData);
  }

  deleteData(index: number) {
    this.data.splice(index, 1);
  }

  updateData(index: number, updatedData: any) {
    this.data[index] = updatedData;
  }
}
