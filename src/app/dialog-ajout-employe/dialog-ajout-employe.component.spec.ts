import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAjoutEmployeComponent } from './dialog-ajout-employe.component';

describe('DialogAjoutEmployeComponent', () => {
  let component: DialogAjoutEmployeComponent;
  let fixture: ComponentFixture<DialogAjoutEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAjoutEmployeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAjoutEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
