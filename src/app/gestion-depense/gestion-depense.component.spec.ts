import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDepenseComponent } from './gestion-depense.component';

describe('GestionDepenseComponent', () => {
  let component: GestionDepenseComponent;
  let fixture: ComponentFixture<GestionDepenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionDepenseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionDepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
