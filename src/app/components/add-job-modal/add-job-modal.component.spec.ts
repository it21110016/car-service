import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobModalComponent } from './add-job-modal.component';

describe('AddJobComponent', () => {
  let component: AddJobModalComponent;
  let fixture: ComponentFixture<AddJobModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddJobModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddJobModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
