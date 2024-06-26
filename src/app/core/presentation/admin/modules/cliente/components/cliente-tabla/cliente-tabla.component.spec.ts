import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteTablaComponent } from './cliente-tabla.component';

describe('ClienteTablaComponent', () => {
  let component: ClienteTablaComponent;
  let fixture: ComponentFixture<ClienteTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteTablaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClienteTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
