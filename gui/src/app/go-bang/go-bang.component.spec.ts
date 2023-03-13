import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoBangComponent } from './go-bang.component';

describe('GoBangComponent', () => {
  let component: GoBangComponent;
  let fixture: ComponentFixture<GoBangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoBangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoBangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
