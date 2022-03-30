import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilVisitadoComponent } from './perfil-visitado.component';

describe('PerfilVisitadoComponent', () => {
  let component: PerfilVisitadoComponent;
  let fixture: ComponentFixture<PerfilVisitadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilVisitadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilVisitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
