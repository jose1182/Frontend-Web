import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarPasswordLinkComponent } from './recuperar-password-link.component';

describe('RecuperarPasswordLinkComponent', () => {
  let component: RecuperarPasswordLinkComponent;
  let fixture: ComponentFixture<RecuperarPasswordLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuperarPasswordLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarPasswordLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
