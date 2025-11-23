import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandesadminComponent } from './commandesadmin.component';

describe('CommandesadminComponent', () => {
  let component: CommandesadminComponent;
  let fixture: ComponentFixture<CommandesadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandesadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandesadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
