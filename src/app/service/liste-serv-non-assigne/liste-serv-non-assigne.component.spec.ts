import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeServNonAssigneComponent } from './liste-serv-non-assigne.component';

describe('ListeServNonAssigneComponent', () => {
  let component: ListeServNonAssigneComponent;
  let fixture: ComponentFixture<ListeServNonAssigneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeServNonAssigneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeServNonAssigneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
