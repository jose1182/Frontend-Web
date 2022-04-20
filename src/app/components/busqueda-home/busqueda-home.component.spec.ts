import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaHomeComponent } from './busqueda-home.component';

describe('BusquedaHomeComponent', () => {
  let component: BusquedaHomeComponent;
  let fixture: ComponentFixture<BusquedaHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
