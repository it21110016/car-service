import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Car } from '../../models/data-models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-car-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-car-modal.component.html',
  styleUrls: ['./add-car-modal.component.scss']
})
export class AddCarModalComponent {
  carForm: FormGroup;
  @Input() isOpen = false; // Make isOpen an input property
  @Output() carAdded = new EventEmitter<Car>(); // Add this line
  @Output() closeModal = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.carForm = this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      color: ['', Validators.required]
    });
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
    this.resetForm();
    this.closeModal.emit();
  }

  onSubmit(): void {
    if (this.carForm.valid) {
      const newCar: Car = this.carForm.value;
      this.dataService.addCar(newCar).subscribe((car: Car) => {
        this.carAdded.emit(car);
        this.resetForm();
        this.close();
      });
    }
  }

  private resetForm() {
    this.carForm.reset({
      make: '',
      model: '',
      year: '',
      color: ''
    });
  }
}
