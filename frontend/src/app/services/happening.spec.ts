import { TestBed } from '@angular/core/testing';

import { Happening } from './happening.service';

describe('Happening', () => {
  let service: Happening;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Happening);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
