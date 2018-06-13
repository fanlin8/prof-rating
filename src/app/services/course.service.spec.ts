import { TestBed, inject } from '@angular/core/testing';

import { Services\courseService } from './services\course.service';

describe('Services\courseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Services\courseService]
    });
  });

  it('should be created', inject([Services\courseService], (service: Services\courseService) => {
    expect(service).toBeTruthy();
  }));
});
