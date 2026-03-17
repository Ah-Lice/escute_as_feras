import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakupPost } from './speakup-post';

describe('SpeakupPost', () => {
  let component: SpeakupPost;
  let fixture: ComponentFixture<SpeakupPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeakupPost],
    }).compileComponents();

    fixture = TestBed.createComponent(SpeakupPost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
