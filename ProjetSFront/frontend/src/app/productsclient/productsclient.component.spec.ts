import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsclientComponent } from './productsclient.component';

describe('ProductsclientComponent', () => {
  let component: ProductsclientComponent;
  let fixture: ComponentFixture<ProductsclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsclientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
