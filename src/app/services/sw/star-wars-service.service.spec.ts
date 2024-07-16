import { TestBed } from '@angular/core/testing';

import { StarWarsServiceService } from './star-wars-service.service';

describe('StarWarsServiceService', () => {
  let service: StarWarsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarWarsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
