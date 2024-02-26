import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAjoutOffreComponent } from './dialog-ajout-offre.component';

describe('DialogAjoutOffreComponent', () => {
  let component: DialogAjoutOffreComponent;
  let fixture: ComponentFixture<DialogAjoutOffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAjoutOffreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAjoutOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
