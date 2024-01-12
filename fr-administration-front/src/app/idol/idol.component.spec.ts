import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdolComponent } from './idol.component';

describe('IdolComponent', () => {
  let component: IdolComponent;
  let fixture: ComponentFixture<IdolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
