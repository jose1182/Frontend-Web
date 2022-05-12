import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteServiceModalComponent } from './delete-service-modal.component';

describe('DeleteServiceModalComponent', () => {
  let component: DeleteServiceModalComponent;
  let fixture: ComponentFixture<DeleteServiceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteServiceModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteServiceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
