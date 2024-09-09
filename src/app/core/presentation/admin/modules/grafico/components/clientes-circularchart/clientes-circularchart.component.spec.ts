import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesCircularchartComponent } from './clientes-circularchart.component';

describe('ClientesCircularchartComponent', () => {
  let component: ClientesCircularchartComponent;
  let fixture: ComponentFixture<ClientesCircularchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesCircularchartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientesCircularchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
