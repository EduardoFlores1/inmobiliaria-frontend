import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConfirmComponent } from './admin-confirm.component';

describe('AdminConfirmComponent', () => {
  let component: AdminConfirmComponent;
  let fixture: ComponentFixture<AdminConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminConfirmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
