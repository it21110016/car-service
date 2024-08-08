import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Car, Job } from '../../models/data-models';
import { TranslateModule } from '@ngx-translate/core';
import { AddJobModalComponent } from '../add-job-modal/add-job-modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AddJobModalComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cars: Car[] = [];
  jobs: Job[] = [];
  carsCount = 0;
  jobsCount = 0;
  isModalOpen = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getCars().subscribe(cars => {
      this.cars = cars;
      this.carsCount = cars.length;
    });

    this.dataService.getJobs().subscribe(jobs => {
      this.jobs = jobs;
      this.updateJobsCount();
    });
  }

  openAddJobModal() {
    this.isModalOpen = true;
  }

  closeAddJobModal() {
    this.isModalOpen = false;
  }

  onJobAdded(newJob: Job) {
    this.jobs.push(newJob);
    this.updateJobsCount();
  }

  completeJob(job: Job) {
    const updatedJob: Job = { ...job, status: 'Completed' };
    this.dataService.updateJob(updatedJob).subscribe(() => {
      const index = this.jobs.findIndex(j => j.id === job.id);
      if (index !== -1) {
        this.jobs[index].status = 'Completed';
        this.updateJobsCount();
      }
    });
  }

  private updateJobsCount() {
    this.jobsCount = this.jobs.filter(job => job.status === 'In Progress').length;
  }
}
