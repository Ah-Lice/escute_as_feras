import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Happening } from './happening';

describe('Happening', () => {
  let component: Happening;
  let fixture: ComponentFixture<Happening>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Happening],
    }).compileComponents();

    fixture = TestBed.createComponent(Happening);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
