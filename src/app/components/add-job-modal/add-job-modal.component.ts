import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Job, Car } from '../../models/data-models';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-job-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-job-modal.component.html',
  styleUrls: ['./add-job-modal.component.scss']
})
export class AddJobModalComponent implements OnInit {
  jobForm: FormGroup;
  cars: Car[] = [];
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() jobAdded = new EventEmitter<Job>();

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router) {
    this.jobForm = this.fb.group({
      carId: ['', Validators.required],
      description: ['', Validators.required],
      status: ['In Progress', Validators.required]
    });
  }

  ngOnInit(): void {
    this.dataService.getCars().subscribe(cars => {
      this.cars = cars;
    });
  }

  close() {
    this.isOpen = false;
    this.resetForm();
    this.closeModal.emit();
  }

  onSubmit(): void {
    if (this.jobForm.valid) {
      const newJob: Job = {
        ...this.jobForm.value,
        carId: this.jobForm.value.carId,
        status: this.jobForm.value.status as 'In Progress' | 'Completed'
      };
      this.dataService.addJob(newJob).subscribe(job => {
        this.jobAdded.emit(job);
        this.resetForm();
        this.close();
      });
    }
  }

  private resetForm() {
    this.jobForm.reset({
      description: '',
      status: 'In Progress'
    });
  }
}
