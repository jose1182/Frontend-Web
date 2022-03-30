import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosByCategoriaComponent } from './servicios-by-categoria.component';

describe('ServiciosByCategoriaComponent', () => {
  let component: ServiciosByCategoriaComponent;
  let fixture: ComponentFixture<ServiciosByCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosByCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosByCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
