import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAjoutDepenseComponent } from './dialog-ajout-depense.component';

describe('DialogAjoutDepenseComponent', () => {
  let component: DialogAjoutDepenseComponent;
  let fixture: ComponentFixture<DialogAjoutDepenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAjoutDepenseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAjoutDepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
