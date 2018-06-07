import { TestBed, inject } from '@angular/core/testing';

import { Services\registerService } from './services\register.service';

describe('Services\registerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Services\registerService]
    });
  });

  it('should be created', inject([Services\registerService], (service: Services\registerService) => {
    expect(service).toBeTruthy();
  }));
});
