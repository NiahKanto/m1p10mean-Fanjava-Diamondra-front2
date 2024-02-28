import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatRDVComponent } from './stat-rdv.component';

describe('StatRDVComponent', () => {
  let component: StatRDVComponent;
  let fixture: ComponentFixture<StatRDVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatRDVComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatRDVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
