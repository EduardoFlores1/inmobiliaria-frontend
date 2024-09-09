import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasBarchartComponent } from './ventas-barchart.component';

describe('VentasBarchartComponent', () => {
  let component: VentasBarchartComponent;
  let fixture: ComponentFixture<VentasBarchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasBarchartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentasBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
