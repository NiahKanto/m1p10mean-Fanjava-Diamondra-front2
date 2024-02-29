import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatPaiementComponent } from './stat-paiement.component';

describe('StatPaiementComponent', () => {
  let component: StatPaiementComponent;
  let fixture: ComponentFixture<StatPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatPaiementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
