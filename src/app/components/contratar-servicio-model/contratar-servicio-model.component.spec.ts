import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratarServicioModelComponent } from './contratar-servicio-model.component';

describe('ContratarServicioModelComponent', () => {
  let component: ContratarServicioModelComponent;
  let fixture: ComponentFixture<ContratarServicioModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratarServicioModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratarServicioModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
