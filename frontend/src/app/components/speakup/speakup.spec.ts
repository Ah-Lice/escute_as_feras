import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Speakup } from './speakup';

describe('Speakup', () => {
  let component: Speakup;
  let fixture: ComponentFixture<Speakup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Speakup],
    }).compileComponents();

    fixture = TestBed.createComponent(Speakup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
