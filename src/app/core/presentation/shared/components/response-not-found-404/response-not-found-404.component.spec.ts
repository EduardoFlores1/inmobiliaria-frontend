import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseNotFound404Component } from './response-not-found-404.component';

describe('ResponseNotFound404Component', () => {
  let component: ResponseNotFound404Component;
  let fixture: ComponentFixture<ResponseNotFound404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponseNotFound404Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResponseNotFound404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
