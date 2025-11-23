import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandesclientComponent } from './commandesclient.component';

describe('CommandesclientComponent', () => {
  let component: CommandesclientComponent;
  let fixture: ComponentFixture<CommandesclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandesclientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandesclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
