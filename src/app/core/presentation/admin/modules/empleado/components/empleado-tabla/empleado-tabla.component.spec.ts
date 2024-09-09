import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoTablaComponent } from './empleado-tabla.component';

describe('EmpleadoTablaComponent', () => {
  let component: EmpleadoTablaComponent;
  let fixture: ComponentFixture<EmpleadoTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadoTablaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpleadoTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
