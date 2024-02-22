import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAjoutServiceComponent } from './dialog-ajout-service.component';

describe('DialogAjoutServiceComponent', () => {
  let component: DialogAjoutServiceComponent;
  let fixture: ComponentFixture<DialogAjoutServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAjoutServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAjoutServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
