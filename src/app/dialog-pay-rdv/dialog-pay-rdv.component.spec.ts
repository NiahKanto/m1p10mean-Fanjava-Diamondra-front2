import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPayRdvComponent } from './dialog-pay-rdv.component';

describe('DialogPayRdvComponent', () => {
  let component: DialogPayRdvComponent;
  let fixture: ComponentFixture<DialogPayRdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogPayRdvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogPayRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
