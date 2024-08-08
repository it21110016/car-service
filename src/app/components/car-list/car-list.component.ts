import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Car } from '../../models/data-models';
import { TranslateModule } from '@ngx-translate/core';
import { AddCarModalComponent } from '../add-car-modal/add-car-modal.component';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AddCarModalComponent
  ],
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];
  isModalOpen = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.dataService.getCars().subscribe(cars => {
      this.cars = cars;
    });
  }

  openAddCarModal() {
    this.isModalOpen = true;
  }

  closeAddCarModal() {
    this.isModalOpen = false;
  }

  onCarAdded(newCar: Car) {
    this.cars.push(newCar);
  }
}
